const express = require('express');
const router = express.Router();
const SensorDataModel = require('./sensorData.js');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const { DateTime } = require('luxon');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(morgan('tiny'));

router.get('/', async (req, res) => {
    try {
        let sensorData = await SensorDataModel.find();
        sensorData = sensorData.map(data => {
            data.timeStamp = DateTime.fromJSDate(data.timeStamp).setZone("Europe/Oslo").toJSDate();
            return data;
        });
        res.status(200).json(sensorData);
    }
    catch (err) {
        console.error('Error in GET /:', err.message);
        console.error(err.stack);
        res.status(404).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const sensorData = await SensorDataModel.findById(req.params.id);
        if (!sensorData) return res.status(404).json("The sensor data with the given ID " + req.params.id + " was not found.");
        res.status(200).json(sensorData);
    }
    catch (err) {
        console.error('Error in GET /:id:', err.message);
        console.error(err.stack);
        res.status(404).json(err);
    }
});

router.post('/', async (req, res) => {
    let sensorId = req.body.sensorId;
    let temperature = req.body.temperature;
    let humidity = req.body.humidity;
    let light = req.body.light;
    let x = req.body.x;
    let y = req.body.y;
    let z = req.body.z;
    let door = req.body.door;
    let timeStamp = DateTime.now().setZone("Europe/Oslo").toJSDate();

    try {
        const dataInstance = new SensorDataModel({
            sensorId: sensorId,
            temperature: temperature,
            humidity: humidity,
            light: light,
            timeStamp: timeStamp,
            x: x,
            y: y,
            z: z,
            door: door
        });

        const result = await dataInstance.save();
        res.status(201).json(result);
    }
    catch (err) {
        console.error('Error in POST /:', err.message);
        console.error(err.stack);
        res.status(500).json(err);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const sensorData = await SensorDataModel.findByIdAndUpdate(req.params.id, {
            sensorId: req.body.sensorId,
            temperature: req.body.temperature,
            humidity: req.body.humidity,
            light: req.body.light,
            x: req.body.x,
            y: req.body.y,
            z: req.body.z,
            door: req.body.door,
            timeStamp: DateTime.now().setZone("Europe/Oslo").toJSDate()
        }, { new: true });

        if (!sensorData) return res.status(404).json("The sensor data with the given ID " + req.params.id + " was not found.");
        res.status(200).json(sensorData);
    }
    catch (err) {
        console.error('Error in PUT /:id:', err.message);
        console.error(err.stack);
        res.status(404).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const sensorData = await SensorDataModel.findByIdAndRemove(req.params.id);
        if (!sensorData) return res.status(404).json("The sensor data with the given ID " + req.params.id + " was not found.");
        res.status(200).json(sensorData);
    }
    catch (err) {
        console.error('Error in DELETE /:id:', err.message);
        console.error(err.stack);
        res.status(404).json(err);
    }
});

module.exports = router;