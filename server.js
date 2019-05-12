const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
app.use(cors());

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
    //res.send('Welcome Home Baby!');
    var results = "My My What progress.";
    return res.json({
        data: results
    });
})

app.listen(4000, () => {
    console.log('Server now listening on port: 4000');
})