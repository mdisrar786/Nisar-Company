const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = 3000;

// Simple middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/autotech')
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.log('❌ MongoDB Error:', err.message));

// Contact model
const Contact = mongoose.model('Contact', {
    name: String,
    email: String,
    phone: String,
    company: String,
    interest: String,
    message: String,
    date: { type: Date, default: Date.now }
});

// API Routes
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is running' });
});

app.post('/api/contact', async (req, res) => {
    try {
        const contact = new Contact(req.body);
        await contact.save();
        res.json({ 
            success: true, 
            message: 'Message sent successfully!' 
        });
    } catch (error) {
        res.json({ 
            success: false, 
            message: 'Error: ' + error.message 
        });
    }
});

app.get('/api/contacts', async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.json({ success: true, data: contacts });
    } catch (error) {
        res.json({ success: false, data: [] });
    }
});

// FIXED: Simple catch-all route
app.use((req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.listen(PORT, () => {
    console.log(`✅ Server running: http://localhost:${PORT}`);
});