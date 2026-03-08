// server.js
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5000;
const {connectDB} = require("./config/db")
// Middleware to allow frontend to connect and parse JSON

async function startServer(){
await connectDB()

app.use(cors());
app.use(bodyParser.json());

// Simple test route to confirm the server is working
app.get('/', (req, res) => {
  res.json({ 
    message: 'ChamaTrack Backend is alive! 🚀',
    status: 'running',
    time: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`ChamaTrack backend server running on http://localhost:${PORT}`);
});

}

startServer()