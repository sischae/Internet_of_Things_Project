'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const util = require('util');
const app = express();
const sqlite3 = require('sqlite3').verbose();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/public', express.static('public'));




// return landing page
app.get('/', async (req, res) => {
    res.status(200).sendFile('views/index.html', {root: __dirname });
});





app.listen(3000, () => {
    console.log('Server running. Listening on port 3000...');
});
