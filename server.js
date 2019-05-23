// -- My stuff -- //
const {
    MYSQL_DB
} = require('./misc/cred');

// -- Other stuff -- //
const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const path = require('path')

const app = express();
app.use(cors());


// -- SQL Connection -- //
// Create connection string.
const connection = mysql.createConnection(MYSQL_DB)

// Attempt to connect to the SQL DB.
connection.connect((err) => {
    if (err) {
        console.log('Error connecting to DB.');
        console.log(`Error: ${JSON.stringify(err, undefined, 2)}`);
    } else {
        console.log('Successfully connected to DB.');
    }
})

// Respond to root domain directory.
app.get('/', (req, res) => {
    var results = "My My What progress.";
    return res.json({
        data: results
    });
})

// Respond to /artists directory (w/ query values).
app.get('/artists', (req, res) => {
    // Parse request params (NOT FOR THIS REQUEST/RESPONSE).
    const {name, phone, address, birthplace, age} = req.query;

    // Make query request from SQL connection.
    connection.query(`SELECT * FROM Artist;`, (err, rows, fields) => {
        if(err){
            console.log(err);
            return res.json({data: null, columns: null });
        }else{
            console.log('Successful Query');
            return res.json({data: rows, columns: fields});
        }
    })
})

// -- Begin listening for client requests (start server) -- //
app.listen(4000, () => {
    console.log('Server now listening on port: 4000');
})