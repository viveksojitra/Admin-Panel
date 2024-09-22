const express = require('express');
const app = express();

const path = require('path');
const router = require('./routes/index');

const db = require('./database/db');
const User = require('./model/userModel');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "/views"));

app.use(express.static(path.join(__dirname, '/views')));
app.use('/assets', express.static(__dirname + '/assets'));
// app.use(express.static(path.join(__dirname, './assets')));
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use('/storage', express.static(path.join(__dirname, 'storage')));

app.use('/', router);

const port = 3002;
app.listen(port, (err) => {
    if (!err) {
        console.log(`Server running on http://localhost:${port}`);
    } else {
        console.error('Error starting server:', err);
    }
});
