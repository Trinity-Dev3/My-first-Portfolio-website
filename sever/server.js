// FILE: server/server.js
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// MAINTENANCE TOGGLE
const MAINTENANCE_MODE = false; 

app.use((req, res, next) => {
    if (MAINTENANCE_MODE) {
        return res.status(503).send("Site is under maintenance. Check back soon!");
    }
    next();
});

// EMAIL ROUTE
app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;

    // Set up your "Transporter" (The mailman)
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    try {
        await transporter.sendMail({
            from: email,
            to: process.env.EMAIL_USER,
            subject: `New Portfolio Message from ${name}`,
            text: message
        });
        res.status(200).json({ success: "Message Sent!" });
    } catch (error) {
        res.status(500).json({ error: "Failed to send message." });
    }
});

const PORT = process.env.PORT || 10000; // Render uses 10000 by default
app.listen(PORT, () => console.log(`Server running`));

app.get('/api/status', (req, res) => {
    res.json({ maintenance: MAINTENANCE_MODE });
});