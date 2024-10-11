const path = require('path');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const budget = require('./expenses_schema');

const app = express();
const port = 3000;
let url = 'mongodb://localhost:27017/budget_data';

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Connect to the database once when the server starts
mongoose.connect(url)
    .then(() => {
        console.log("Connected to the database");
    })
    .catch((connectionError) => {
        console.error("Database connection error:", connectionError);
    });

app.get('/budget', (req, res) => {
    budget.find({})
        .then((data) => {
            res.json(data);
        })
        .catch((connectionError) => {
            console.log(connectionError);
            res.status(500).send('Error fetching data');
        });
});

app.post('/add', (req, res) => {
    const entries = req.body; // Array of entries

    budget.insertMany(entries)
        .then((result) => {
            console.log('Entries added:', result);
            res.json(result);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Error saving entries');
        });
});

app.use('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html')); 
 });

app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`);
});
