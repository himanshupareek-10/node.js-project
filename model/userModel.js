const mongoose = require('mongoose');
const IdentifierGenerator = require('mongoose-plugin-autoinc');
const TechStackEnum = require('../enumeration/techStackEnum');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name field is required'],
        match: /^[a-zA-Z ]$/,
        minLength: 2,
        maxLength: 30
    },
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    birthDate: {
        type: Date,
        default: new Date()
    },
    likeDevelopment: {
        type: Boolean,
        default: true
    },
    techStack: {
        type: [String],
        enum: TechStackEnum.getList()
    }
}, { _id: false, usePushEach: true, timeStamps: true });

userSchema.plugin(IdentifierGenerator.plugin, {
    model: 'User',
    startAt: 1000
});

module.exports = mongoose.model('User', userSchema);