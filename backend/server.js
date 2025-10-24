const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// CORS setup - IMPORTANT for frontend-backend connection
app.use(cors({
    origin: "http://localhost:3000", // Frontend URL
    credentials: true
}));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from frontend folder
app.use(express.static(path.join(__dirname, '../frontend')));

// MongoDB connection
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/autotech', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('✅ MongoDB Connected');
    } catch (error) {
        console.log('⚠️  MongoDB not connected, but server will run');
    }
};
connectDB();

// Contact schema
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    company: String,
    interest: String,
    message: String,
    submittedAt: { type: Date, default: Date.now }
});
const Contact = mongoose.model('Contact', contactSchema);

// ========== API ROUTES ==========

// Health check - Test karne ke liye
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'success',
        message: 'Backend server is running!',
        timestamp: new Date().toISOString()
    });
});

// Contact form submission
app.post('/api/contact', async (req, res) => {
    console.log('📨 Contact form data received:', req.body);
    
    try {
        const { name, email, phone, company, interest, message } = req.body;

        // Basic validation
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: 'Name, email and message are required'
            });
        }

        // Database mein save karein
        const contact = new Contact({
            name: name.trim(),
            email: email.trim(),
            phone: (phone || '').trim(),
            company: (company || '').trim(),
            interest: interest || '',
            message: message.trim()
        });

        // Agar database connected hai toh save karein
        if (mongoose.connection.readyState === 1) {
            await contact.save();
            console.log('✅ Contact saved to database');
        }

        // Success response
        res.json({
            success: true,
            message: 'Thank you! Your message has been sent successfully.',
            data: {
                name: contact.name,
                email: contact.email
            }
        });

    } catch (error) {
        console.error('❌ Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error, but your message was received'
        });
    }
});

// Get all contacts (testing ke liye)
app.get('/api/contacts', async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ submittedAt: -1 });
        res.json({
            success: true,
            count: contacts.length,
            data: contacts
        });
    } catch (error) {
        res.json({
            success: false,
            message: 'Error fetching contacts',
            data: []
        });
    }
});

// ========== FRONTEND SERVING ==========

// SPA (Single Page Application) support
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.get('/gallery', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Catch-all route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log('🚀 Server started successfully!');
    console.log(`📍 Frontend: http://localhost:${PORT}`);
    console.log(`🔗 API Health: http://localhost:${PORT}/api/health`);
    console.log(`📊 Contacts API: http://localhost:${PORT}/api/contacts`);
});