const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

// Database Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Replace with your MySQL username
    password: 'sudha', // Replace with your MySQL password
    database: 'Smart', // Replace with your database name
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to the MySQL database');
});

// API to Add an Event
router.post('/add-event', (req, res) => {
    const { name, capacity, date, time, venue } = req.body;

    if (!name || !capacity || !date || !time || !venue) {
        return res.status(400).send('All fields are required');
    }

    const query = `INSERT INTO events_details (name, capacity, date, time, venue) VALUES (?, ?, ?, ?, ?)`;
    db.query(query, [name, capacity, date, time, venue], (err) => {
        if (err) {
            console.error('Error inserting event:', err);
            return res.status(500).send('Failed to add event');
        }
        res.status(200).send('Event added successfully');
    });
});

// API to Fetch All Events
router.get('/get-events', (req, res) => {
    const query = `SELECT * FROM events`;
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching events:', err);
            return res.status(500).send('Failed to fetch events');
        }
        res.status(200).json(results);
    });
});

// API to Delete an Event
router.delete('/delete-event/:id', (req, res) => {
    const eventId = req.params.id;

    const query = `DELETE FROM events WHERE id = ?`;
    db.query(query, [eventId], (err) => {
        if (err) {
            console.error('Error deleting event:', err);
            return res.status(500).send('Failed to delete event');
        }
        res.status(200).send('Event deleted successfully');
    });
});

module.exports = router;
