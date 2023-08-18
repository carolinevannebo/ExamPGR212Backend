const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const morgan = require('morgan');
const router = require('./router.js');
const bodyParser = require('body-parser');
const dbConnection = require('./secrets.js');

mongoose.set('strictQuery', true);
mongoose.connect(dbConnection)
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB. Error: ', err));

const allowedOrigins = [
    'http://localhost:3000', 
    'https://localhost:3000', 
    'http://192.168.68.109:3000'
];

const corsOptions = {origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('', router);

app.listen(3001, () => console.log('Listening on port 3001...'));