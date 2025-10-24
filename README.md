AutoTech Solutions - Automotive Equipment Website
A complete, responsive website for AutoTech Solutions - a premium automotive equipment manufacturing company. This full-stack application features a modern design with functional contact form and MongoDB integration.

🚀 Live Demo
Live Website | API Health Check

✨ Features
Responsive Design - Works perfectly on all devices

Modern UI/UX - Clean and professional automotive industry design

Product Gallery - Showcase of automotive equipment (lifts, alignment machines, tire changers, etc.)

Functional Contact Form - With MongoDB database integration

Full-Stack Architecture - Frontend + Backend + Database

Production Ready - Optimized for deployment

🛠️ Tech Stack
Frontend
HTML5, CSS3, JavaScript (ES6+)

Responsive Grid & Flexbox layouts

Font Awesome icons

Modern CSS variables and animations

Backend
Node.js with Express.js

MongoDB with Mongoose ODM

CORS enabled for cross-origin requests

Environment variables configuration

Deployment
Render.com (Hosting)

MongoDB Atlas (Cloud Database)

📁 Project Structure
text
autotech-website/
├── frontend/
│   ├── index.html          # Main HTML file
│   ├── css/
│   │   └── style.css       # All styles
│   ├── js/
│   │   └── script.js       # Frontend JavaScript
│   └── assets/
│       └── images/         # Product images
├── backend/
│   ├── server.js           # Express server
│   └── package.json        # Backend dependencies
├── package.json            # Root package.json
└── .gitignore             # Git ignore rules
🚀 Quick Start
Prerequisites
Node.js (v16 or higher)

MongoDB (local or Atlas)

Git

Local Development
Clone the repository

bash
git clone https://github.com/yourusername/autotech-website.git
cd autotech-website
Install dependencies

bash
npm install
cd backend && npm install
Set up environment variables
Create backend/.env:



bash
mongod
Run the application

bash
cd backend
npm start
Open your browser
Navigate to http://localhost:3000

📧 Contact Form API
The contact form sends data to MongoDB with the following structure:

javascript
{
  name: "String (required)",
  email: "String (required)", 
  phone: "String (optional)",
  company: "String (optional)",
  interest: "String (optional)",
  message: "String (required)",
  submittedAt: "Date (auto-generated)"
}
API Endpoints:

POST /api/contact - Submit contact form

GET /api/contacts - View all submissions (admin)

GET /api/health - Server health check

🌐 Deployment
Deploy to Render.com
Fork this repository to your GitHub account

Create MongoDB Atlas Database

Sign up at MongoDB Atlas

Create a free cluster

Get connection string

Deploy to Render

Go to Render.com

Connect your GitHub repository

Set environment variables:

NODE_ENV=production

MONGODB_URI=your_mongodb_atlas_connection_string

Deploy!

Environment Variables for Production
env
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/autotech
PORT=10000
🎨 Customization
Colors (CSS Variables)
Modify in frontend/css/style.css:

css
:root {
  --primary: #1a3a5f;    /* Main blue */
  --secondary: #e63946;  /* Accent red */
  --accent: #2a9d8f;     /* Green */
  --light: #f1faee;      /* Light background */
  --dark: #1d3557;       /* Dark blue */
}
Products
Update products in frontend/index.html gallery section.

Company Information
Edit content in respective sections of frontend/index.html.

📱 Responsive Breakpoints
Mobile: < 768px

Tablet: 768px - 992px

Desktop: > 992px

🤝 Contributing
Fork the project

Create your feature branch (git checkout -b feature/AmazingFeature)

Commit your changes (git commit -m 'Add some AmazingFeature')

Push to the branch (git push origin feature/AmazingFeature)

Open a Pull Request

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

🐛 Troubleshooting
Common Issues
MongoDB Connection Error

Check if MongoDB service is running

Verify connection string in .env

Port Already in Use

Change PORT in .env file

Kill existing process: npx kill-port 3000

CORS Errors

Ensure frontend and backend are on same domain in production

Check CORS configuration in server.js

Getting Help
Check browser console for errors

Examine server logs in terminal

Verify all environment variables are set

📞 Support
For support and queries:

Create an Issue

Email: support@autotechsolutions.com

Built with ❤️ for the automotive industry

