//import mysql from 'mysql';
const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: '35.222.200.150',
    user: 'sample',
    password: 'sample',
    database: 'ArtGallery'
})

connection.connect((err) => {
    if (err) {
        console.log('Error connecting to DB.');
        console.log(`Error: ${JSON.stringify(err, undefined, 2)}`);
    } else {
        console.log('Successfully connected to DB.');
    }
})

app.listen(80, () => {
    console.log('Express Server running at port 3000.')
});

app.get('/', (req, res) => {
    res.send('Welcome Home!');
})

app.get('/artists', (req, res) => {
    connection.query('SELECT * FROM Artist', (err, rows, fields) => {
        if (err) {
            console.log('Error getting artists.');
            console.log(`Error: ${err}`);
        } else {
            console.log(rows);
        }
    })

    res.send('Artists from the Gallery!');
})