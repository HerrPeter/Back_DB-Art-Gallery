// -- Other stuff -- //
const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const path = require('path')

const app = express();
app.use(cors());

// -- My stuff -- //
const {
    MYSQL_DB
} = require('./misc/cred');

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

// Begin listening for client requests (start server).
app.listen(4000, () => {
    console.log('Server now listening on port: 4000');
})