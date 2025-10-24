// Contact Form Handling
const userForm = document.getElementById('userForm');
const formMessage = document.getElementById('formMessage');

// Server connection test
async function testServerConnection() {
    try {
        console.log('🔍 Testing server connection...');
        const response = await fetch('/api/health');
        const data = await response.json();
        console.log('✅ Server is running:', data);
        return true;
    } catch (error) {
        console.error('❌ Server connection failed:', error);
        return false;
    }
}

// Page load pe connection test
document.addEventListener('DOMContentLoaded', function() {
    testServerConnection();
});

// Form submission
userForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    console.log('🔄 Form submission started...');
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        company: document.getElementById('company').value.trim(),
        interest: document.getElementById('interest').value,
        message: document.getElementById('message').value.trim()
    };
    
    console.log('📝 Form data:', formData);
    
    // Validation
    if (!formData.name || !formData.email || !formData.message) {
        showMessage('Please fill in all required fields.', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        showMessage('Please enter a valid email address.', 'error');
        return;
    }
    
    try {
        // Show loading
        const submitBtn = userForm.querySelector('button[type="submit"]');
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        console.log('📤 Sending to server...');
        
        // API call
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        console.log('📥 Response status:', response.status);
        
        const result = await response.json();
        console.log('📄 Server response:', result);
        
        if (result.success) {
            showMessage(result.message, 'success');
            userForm.reset();
        } else {
            throw new Error(result.message);
        }
        
    } catch (error) {
        console.error('❌ Submission error:', error);
        showMessage('Error: ' + error.message, 'error');
    } finally {
        // Reset button
        const submitBtn = userForm.querySelector('button[type="submit"]');
        submitBtn.textContent = 'Send Message';
        submitBtn.disabled = false;
    }
});

// Message display function
function showMessage(text, type) {
    formMessage.textContent = text;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
    
    if (type === 'success') {
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
}

// Manual test function (browser console se use karein)
window.testConnection = async function() {
    console.log('🧪 Testing connection...');
    
    try {
        const response = await fetch('/api/health');
        const data = await response.json();
        console.log('✅ Connection successful:', data);
        return data;
    } catch (error) {
        console.error('❌ Connection failed:', error);
        return null;
    }
};

window.testForm = async function() {
    const testData = {
        name: "Test User",
        email: "test@example.com",
        phone: "1234567890",
        company: "Test Company",
        interest: "lifts",
        message: "This is a test message from browser console"
    };
    
    console.log('🧪 Testing form with:', testData);
    
    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(testData)
        });
        
        const result = await response.json();
        console.log('🧪 Test result:', result);
        return result;
    } catch (error) {
        console.error('🧪 Test failed:', error);
        return { error: error.message };
    }
};