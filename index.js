const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const countersRouter = require('./routes/countersRouter');

mongoose.connect('mongodb://localhost:27017/playground', { useNewUrlParser: true })
    .then(() => console.log("Successfully connected to MongoDb..."))
    .catch(err => console.log("Error occured:", err));

const app = express();

// Middlewares:
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

// Routes:
app.use('/api/counts', countersRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}...`));