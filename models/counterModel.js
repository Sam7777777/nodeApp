const mongoose = require('mongoose');

const countSchema = new mongoose.Schema({
    date: {
        type: Date
    },
    sum: {
        type: Number
    },
    description: {
        type: String
    }
});

const CountModel = mongoose.model('count', countSchema);

module.exports = CountModel;