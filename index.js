//import mysql from 'mysql';
const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
var app = express();

app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: '35.222.200.150',
    user: 'sample',
    password: 'sample',
    database: 'ArtGallery'
})

// connection.connect((err) => {
//     if (err) {
//         console.log('Error connecting to DB.');
//         console.log(`Error: ${JSON.stringify(err, undefined, 2)}`);
//     } else {
//         console.log('Successfully connected to DB.');
//     }
// })

const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
    console.log(`Express Server running at port ${PORT}.`)
});

app.get('/', (req, res) => {
    res.send('Welcome Home!');
})

app.get('/artists', (req, res) => {
    // var artists = 'NA';
    // connection.query('SELECT * FROM Artist', (err, rows, fields) => {
    //     if (err) {
    //         console.log('Error getting artists.');
    //         console.log(err);
    //     } else {
    //         artists = rows;
    //         console.log(rows);
    //         //res.send(artists);
    //     }
    // })
    res.json({stuff: 'Artists here'});
    //res.send(`Artists from the Gallery!\n${JSON.stringify(artists)}`);
})