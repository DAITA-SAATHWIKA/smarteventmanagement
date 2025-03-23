-- Create and use the database
CREATE DATABASE IF NOT EXISTS Smart;
USE Smart;

-- Create Users Table (if it doesn't exist)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Create Admin Users Table (if it doesn't exist)
CREATE TABLE IF NOT EXISTS admin_users (
    admin_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Create Events Table (if it doesn't exist)
CREATE TABLE IF NOT EXISTS events (
    event_id INT AUTO_INCREMENT PRIMARY KEY,
    event_name VARCHAR(100) NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    venue VARCHAR(100) NOT NULL,
    seating_area VARCHAR(50) NOT NULL
);

-- Insert Users (avoiding duplicates)
INSERT IGNORE INTO users (username, password) VALUES 
('Harshu_2005', 'Harshu@25'),
('Saathwika.04', 'Daitasaathwika05'),
('Chethan_14', 'Chethanreddy');

-- Insert Admin Users (avoiding duplicates)
INSERT IGNORE INTO admin_users (username, password) VALUES 
('Admin_Harshu', 'AdminPass123'),
('Admin_Saathwika', 'SecurePass456'),
('Admin_Chethan', 'StrongPass789');

-- Insert Events (avoiding duplicates)
INSERT IGNORE INTO events (event_name, date, time, venue, seating_area) VALUES 
('Tech Conference', '2025-04-10', '10:00:00', 'Hyderabad Convention Center', 'VIP'),
('AI Workshop', '2025-05-15', '14:00:00', 'Bangalore Tech Park', 'General'),
('Coding Hackathon', '2025-06-20', '09:30:00', 'Delhi Auditorium', 'Back Stage'),
('Data Science Summit', '2025-07-10', '11:00:00', 'Mumbai Tech Hub', 'VIP'),
('Blockchain Meetup', '2025-08-20', '16:30:00', 'Pune Convention Center', 'General'),
('Cybersecurity Workshop', '2025-09-15', '13:45:00', 'Chennai IT Park', 'Front Row');



