const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name field is required'],
        match: /^[a-zA-Z ]$/,
        minLength: 2,
        maxLength: 30
    },
    dob: {
        
    },
    tf: {
        type: Boolean,
        default: true
    },
    interest: String
});

module.exports = mongoose.model('Person', personSchema);