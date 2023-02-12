const mongoose = require('mongoose');
const IdentifierGenerator = require('mongoose-plugin-autoinc');

const deviceSchema = mongoose.Schema({
    user: {
        type: Number,
        ref: 'User',
        require: true
    }, 
    deviceId: {
        type: String,
        required: true
    },
    loginToken: {
        type: String,
        required: true,
        select: false
    }
}, { _id: false, usePushEach: true, timeStamps: true });

deviceSchema.plugin(IdentifierGenerator.plugin, {
    model: 'Device',
    startAt: 1000
});

module.exports = mongoose.model('Device', deviceSchema);