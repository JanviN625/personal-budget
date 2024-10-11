// Budget API

const path = require('path');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const budget = require('./expenses_schema');

let url = 'mongodb://localhost:27017/budget_data';


app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/budget', (req, res) => {
    mongoose.connect(url)
        .then(() => {
            console.log("Connected to the database");
            budget.find({})
                .then((data) => {
                    res.json(data);
                })
                .catch((connectionError) => {
                    console.log(connectionError);
                });
        })
        .catch((connectionError) => {
            console.log(connectionError);
        });
});

app.use('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html')); 
 });

app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`);
});