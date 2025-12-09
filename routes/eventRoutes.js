const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/events.json');

function getEvents() {
    if (!fs.existsSync(filePath)) return [];
    const jsonData = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(jsonData || "[]");
}

function saveEvents(events) {
    fs.writeFileSync(filePath, JSON.stringify(events, null, 2), "utf-8");
}

router.get('/',(req ,res)=>{
    try {
        let events = getEvents();
        
        // Search by name
        if(req.query.name){
            const name = req.query.name.toLowerCase();
            events = events.filter(e => e.name.toLowerCase().includes(name)); 
        }

        // Search by date
        if(req.query.date){
            events = events.filter(e => e.date === req.query.date);
        }

        res.json(events);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch events' });
    }
});


router.get('/:id', (req, res) => {
    try {
        const events = getEvents();
        const eventId = parseInt(req.params.id);
        const event = events.find(e => e.id === eventId);
        if (!event) return res.status(404).json({ error: 'Event not found' });
        res.json(event);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch event' });
    }
});
router.post('/', (req, res) => {
    try {
        const events = getEvents();
        const newEvent = req.body;
        events.push(newEvent);
        saveEvents(events);
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create event' });
    }
});


//Update event
router.put('/:id', (req, res) => {
    try {
        const events = getEvents();
        const eventId = parseInt(req.params.id);
        const event = events.find(e => e.id === eventId);
        if(!event) return res.status(404).json({ error: 'Event not found' });
        
        event.name = req.body.name || event.name;
        event.date = req.body.date || event.date;
        saveEvents(events);
        res.json(event);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update event' });
    }
});

//delete event
router.delete('/:id', (req, res) => {
    try {
        const events = getEvents();
        const eventId = parseInt(req.params.id);
        console.log('DELETE request - Looking for event ID:', eventId, 'Type:', typeof eventId);
        console.log('Available events:', events.map(e => ({ id: e.id, type: typeof e.id })));
        
        const index = events.findIndex(e => e.id === eventId);
        console.log('Found index:', index);

        if (index === -1) return res.status(404).json({ error: 'Event not found' });

        const deletedEvent = events.splice(index, 1);
        console.log('Deleted event:', deletedEvent[0]);
        saveEvents(events);
        res.json(deletedEvent[0]);
    } catch (error) {
        console.error('DELETE error:', error);
        res.status(500).json({ error: 'Failed to delete event' });
    }
});

module.exports = router;