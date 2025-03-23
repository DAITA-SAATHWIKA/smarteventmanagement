const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'sudha', // Replace with your MySQL password
    database: 'Smart', // Replace with your database name
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Connected to MySQL database.');
});

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Login API!');
});

// Login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Check if the user is admin
    if (username === 'admin' && password === 'admin123') {
        return res.status(200).json({ message: 'Login successful!' });
    }

    // Check regular user in the database
    const query = 'SELECT * FROM admin_users WHERE username = ? AND password = ?';
    db.query(query, [username, password], (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ message: 'Internal server error.' });
        }

        if (results.length > 0) {
            res.status(200).json({ message: 'Login successful!' });
        } else {
            res.status(401).json({ message: 'Invalid username or password.' });
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
