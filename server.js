const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/user');

const app = express();

// MongoDB Connection
mongoose.connect('mongodb+srv://bikramaditya4710_db_user:E64OxVnaQjdNfW1w@cluster0.jadnh5w.mongodb.net/?appName=Cluster0')
.then(()=> console.log('✅ MongoDB Connected'))
.catch((err) => console.log('❌ MongoDB Connection Error:',err))

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Request logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Root route
app.get('/', (req, res) => {
    res.json({
        message: 'College Event Management API',
        status: 'running'
    });
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        time: new Date().toISOString()
    });
});

// Events routes
app.use('/events', require('./routes/eventRoutes'));

// Applications routes
app.use('/applications', require('./routes/applicationRoutes'));

// Signup route
app.post('/signup', async (req, res) => {
  try {
    // Log the request body for debugging
    console.log('Request body:', req.body);
    
    // Signup logic here
    const { name, email, password } = req.body;
    
    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({ 
        error: 'Missing required fields: name, email, password',
        received: { name, email, password }
      });
    }
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({ message: 'Signup successful', user: { name, email } });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ error: 'Signup failed', details: err.message });
  }
});

// 404 handler for undefined routes
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found',
        data: {
            requestedRoute: `${req.method} ${req.originalUrl}`,
            availableRoutes: {
                'GET /': 'API information',
                'GET /health': 'Health check',
                'GET /events': 'Get all events',
                'GET /events/:id': 'Get event by ID',
                'POST /events': 'Create new event',
                'PUT /events/:id': 'Update event',
                'DELETE /events/:id': 'Delete event'
            }
        }
    });
});

// Global error handling middleware
app.use((error, req, res, next) => {
    console.error('Global error handler:', {
        message: error.message,
        stack: error.stack,
        url: req.url,
        method: req.method,
        timestamp: new Date().toISOString()
    });
    
    // Handle JSON parsing errors
    if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
        return res.status(400).json({
            success: false,
            message: 'Invalid JSON in request body',
            error: {
                type: 'JSON Parse Error',
                details: 'Request body contains invalid JSON syntax'
            }
        });
    }

    // Handle other errors
    const statusCode = error.status || error.statusCode || 500;
    const message = error.message || 'An unexpected error occurred';
    
    res.status(statusCode).json({
        success: false,
        message: message,
        error: {
            type: error.name || 'Internal Server Error',
            ...(process.env.NODE_ENV === 'development' && { 
                stack: error.stack,
                details: error 
            })
        }
    });
});

// Start server
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📊 Health check available at http://localhost:${PORT}/health`);
    console.log(`📅 Events API available at http://localhost:${PORT}/events`);
}).on('error', (error) => {
    console.error('❌ Failed to start server:', error);
    if (error.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Please use a different port.`);
    }
    process.exit(1);
});

module.exports = app;
