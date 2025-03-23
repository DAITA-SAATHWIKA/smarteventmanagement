const express = require('express');
const router = express.Router();
const mysql = require('mysql');

// MySQL database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'sudha', // Replace with your database password
    database: 'Smart', // Replace with your database name
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database.');
});

// Utility function to categorize events
function categorizeEvents(events) {
    const now = new Date();
    const upcoming = [];
    const live = [];
    const completed = [];

    events.forEach((event) => {
        const eventDateTime = new Date(`${event.date}T${event.time}`);
        if (eventDateTime > now) {
            upcoming.push(event);
        } else if (eventDateTime.toDateString() === now.toDateString() && eventDateTime.getTime() <= now.getTime() + 2 * 60 * 60 * 1000) {
            live.push(event); // Event is live if it is within 2 hours of the current time
        } else {
            completed.push(event);
        }
    });

    return { upcoming, live, completed };
}

// Route to fetch categorized events
router.get('/events', (req, res) => {
    const query = 'SELECT * FROM events';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching events:', err);
            return res.status(500).json({ error: 'Failed to fetch events' });
        }

        const { upcoming, live, completed } = categorizeEvents(results);

        res.json({
            upcoming,
            live,
            completed,
        });
    });
});

module.exports = router;
