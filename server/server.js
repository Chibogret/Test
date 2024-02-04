require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes'); // Import the user routes
const cors = require('cors');
const path = require('path'); // Import path if you're using it in production

const app = express();

// Connect to Database
connectDB();

app.use(cors());

// Middleware for parsing JSON bodies
app.use(express.json());

// Use the Auth Routes
app.use('/api/auth', authRoutes);

// Use the User Routes
app.use('/api', userRoutes); // Use the user routes with a base path

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => res.send('API Running'));

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(PORT, '0.0.0.0', () => console.log(`Server started on port ${PORT}`));
