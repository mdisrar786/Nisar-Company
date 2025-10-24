const express = require('express');
const Contact = require('../models/Contact');
const router = express.Router();

// Submit contact form
router.post('/contact', async (req, res) => {
    try {
        const { name, email, phone, company, interest, message } = req.body;
        
        // Basic validation
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: 'Name, email, and message are required fields'
            });
        }

        const contact = new Contact({
            name,
            email,
            phone: phone || '',
            company: company || '',
            interest: interest || '',
            message
        });
        
        await contact.save();
        
        console.log('New contact form submitted:', { name, email });
        
        res.status(201).json({ 
            success: true,
            message: 'Contact form submitted successfully',
            data: {
                id: contact._id,
                name: contact.name,
                email: contact.email
            }
        });
    } catch (error) {
        console.error('Error saving contact:', error);
        
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ 
                success: false,
                message: 'Validation error',
                errors: errors
            });
        }
        
        res.status(500).json({ 
            success: false,
            message: 'Error saving contact form data' 
        });
    }
});

// Get all contacts (for admin purposes) - Add authentication in production
router.get('/contacts', async (req, res) => {
    try {
        const { page = 1, limit = 10, status } = req.query;
        const query = status ? { status } : {};
        
        const contacts = await Contact.find(query)
            .sort({ submittedAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .select('-__v'); // Exclude version key
            
        const total = await Contact.countDocuments(query);
        
        res.json({
            success: true,
            data: contacts,
            pagination: {
                current: parseInt(page),
                pages: Math.ceil(total / limit),
                total
            }
        });
    } catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).json({ 
            success: false,
            message: 'Error fetching contacts' 
        });
    }
});

// Update contact status
router.patch('/contacts/:id', async (req, res) => {
    try {
        const { status } = req.body;
        
        if (!['new', 'contacted', 'resolved'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status value'
            });
        }
        
        const contact = await Contact.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        );
        
        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Contact not found'
            });
        }
        
        res.json({
            success: true,
            data: contact
        });
    } catch (error) {
        console.error('Error updating contact:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating contact'
        });
    }
});

// Get contact by ID
router.get('/contacts/:id', async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id).select('-__v');
        
        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Contact not found'
            });
        }
        
        res.json({
            success: true,
            data: contact
        });
    } catch (error) {
        console.error('Error fetching contact:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching contact'
        });
    }
});

module.exports = router;