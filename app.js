require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const port = process.env.PORT || 5000;


const index = require('./routes/index');
const analyze = require('./routes/analyze');

const app = express();

app.use(express.static(path.join(__dirname, 'client/build')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', index);
app.use('/api', analyze);

app.listen(port);
console.log(`App is running on port ${port}`);
module.exports = app;
