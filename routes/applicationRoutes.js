const filePath = './data/applications.json';
const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Get all applications
router.get('/', (req, res) => {
    let applications = [];
    if(fs.existsSync(filePath)){
        const data = fs.readFileSync(filePath, "utf-8");
        applications = JSON.parse(data || "[]");
    }
    res.json(applications);
});

// Apply for an event
router.post('/', (req, res) => {
    let applications = [];
    if(fs.existsSync(filePath)){
        const data = fs.readFileSync(filePath, "utf-8");
        applications = JSON.parse(data || "[]");
    }

    const newApplication = {
        id: applications.length > 0 ? applications[applications.length - 1].id + 1 : 1,
        eventId: req.body.eventId,
        studentName: req.body.studentName,
        email: req.body.email,
        phone: req.body.phone,
        appliedAt: new Date().toISOString().split('T')[0]
    };

    applications.push(newApplication);
    fs.writeFileSync(filePath, JSON.stringify(applications, null, 2), "utf-8");
    res.status(201).json(newApplication);
});

// Get applications for specific event
router.get('/event/:eventId', (req, res) => {
    let applications = [];
    if(fs.existsSync(filePath)){
        const data = fs.readFileSync(filePath, "utf-8");
        applications = JSON.parse(data || "[]");  
    }
    
    const eventId = parseInt(req.params.eventId);
    const eventApplications = applications.filter(app => app.eventId === eventId);
    res.json(eventApplications);
});

module.exports = router;
