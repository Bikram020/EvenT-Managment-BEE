# College Event Management Backend

Backend API for College Event Management System built with Node.js, Express, and MongoDB.

## Features

- 🎓 Event Management (CRUD operations)
- 📝 Student Applications
- 👤 User Authentication (Signup)
- 🔍 Event Search by name and date
- 💾 MongoDB Database
- 🔐 Environment-based configuration

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/Bikram020/EvenT-Managment-BEE.git
cd EvenT-Managment-BEE
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Create a `.env` file in the root directory:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string
DB_NAME=college_events
JWT_SECRET=your_jwt_secret_key
FRONTEND_URL=http://localhost:3000
```

### 4. Start the server

**Development mode:**
```bash
npm start
```

**Production mode:**
```bash
npm run start:prod
```

## API Endpoints

### Events
- `GET /events` - Get all events (supports search by name and date)
- `GET /events/:id` - Get event by ID
- `POST /events` - Create new event
- `PUT /events/:id` - Update event
- `DELETE /events/:id` - Delete event

### Applications
- `GET /applications` - Get all applications
- `POST /applications` - Submit application
- `GET /applications/event/:eventId` - Get applications for specific event

### Authentication
- `POST /signup` - User signup

### Health Check
- `GET /` - API information
- `GET /health` - Health check

## Project Structure

```
Backend/
├── data/
│   ├── events.json
│   └── applications.json
├── models/
│   └── user.js
├── routes/
│   ├── eventRoutes.js
│   └── applicationRoutes.js
├── .env (not in git)
├── .env.example
├── .gitignore
├── server.js
└── package.json
```

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment | `development` or `production` |
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://...` |
| `DB_NAME` | Database name | `college_events` |
| `JWT_SECRET` | JWT secret key | `your_secret_key` |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:3000` |

## Security Notes

⚠️ **Never commit `.env` file to Git!**

- The `.env` file contains sensitive information
- Use `.env.example` as a template
- Update production values when deploying

## Deployment

### Deploy to Render/Railway/Heroku

1. Push code to GitHub
2. Connect your hosting platform to GitHub repo
3. Set environment variables in platform dashboard
4. Deploy!

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT

## Author

Bikram Aditya
- GitHub: [@Bikram020](https://github.com/Bikram020)
