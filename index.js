//import mysql from 'mysql';
const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Not working
var app = express();

app.use(bodyParser.json());

app.listen(4000, () => {
    console.log('Express Server running at port 4000.')
});

// --
var http = require('http');
http.createServer(function(req, res) {
    res.end('Hi there.');
}).listen(3030);
//--


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

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.get('/artists', (req, res) => {
    connection.query('SELECT * FROM Artist', (err, rows, fields) => {
        if (err) {
            console.log('Error getting artists.');
            console.log(`Error: ${err}`);
        } else {
            console.log('Success...');
            console.log(rows);
        }
    });

    res.send('Artists.');
})