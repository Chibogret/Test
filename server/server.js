require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db'); // Adjust the path based on your file structure

const app = express();

// Connect to Database
connectDB();

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => res.send('API Running'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }