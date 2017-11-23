require('dotenv').config();
const express = require('express');
const port = process.env.PORT || 5000;

const index = require('./routes/index');
const analyze = require('./routes/analyze');

const app = express();

app.use('/', index);
app.use('/api', analyze);

app.listen(port);
module.exports = app;
