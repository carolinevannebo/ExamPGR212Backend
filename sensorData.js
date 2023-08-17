const mongoose = require('mongoose');
const { DateTime } = require('luxon');

mongoose.set('strictQuery', true);

const sensorDataSchema = new mongoose.Schema({
    sensorId: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50
    },
    temperature: {
        type: Number,
        required: true
    },
    humidity: {
        type: Number,
        required: true
    },
    light: {
        type: Number,
        required: true
    },
    x: {
        type: Number,
        required: true
    },
    y: {
        type: Number,
        required: true
    },
    z: {
        type: Number,
        required: true
    },
    door: {
        type: String,
        required: true
    },
    timeStamp: {
        type: Date,
        required: true,
        default: DateTime.now().setZone("Europe/Oslo").toJSDate()
    }
});

module.exports = mongoose.model('SensorData', sensorDataSchema);