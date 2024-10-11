const mongoose = require('mongoose');

const expensesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    budget: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true,
        validate: function (value) {
            if (value.length !== 7) {
                return false;
            }
            if (value[0] !== '#') {
                return false;
            }
            for (let i = 1; i < 7; i++) {
                if (!'0123456789abcdef'.includes(value[i])) {
                    return false;
                }
            }
            return true;
        }
    }
}, {collection: 'expenses', versionKey: false});

module.exports = mongoose.model('expenses', expensesSchema);