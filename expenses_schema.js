const mongoose = require('mongoose');

const expensesSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
        unique: true
    },
    budget: {
        type: Number,
        require: true
    },
    color: {
        type: String,
        require: true
    }
}, {collection: 'expenses'});

module.exports = mongoose.model('expenses', expensesSchema);