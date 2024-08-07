require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const messageRoutes = require('./routes/messages');
const bucketListRoutes = require('./routes/bucketList');
const questionsRouter = require('./routes/questions');
const cors = require('cors');
const path = require('path');

const app = express();

// Connect to Database
connectDB();

app.use(cors());


// Middleware for parsing JSON bodies
app.use(express.json());
app.use('/api/messages', messageRoutes);
app.use('/api/bucketlist', bucketListRoutes);
app.use('/questions', questionsRouter);


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
