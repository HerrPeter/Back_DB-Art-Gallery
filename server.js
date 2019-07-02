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

// Respond to a column request.
app.get('/ag_db', (req, res) => {
    // Parse request params.
    const {table} = req.query;
    
    // Quit if no valid table to query.
    if(!table){
        console.log(`Invalid table: ${table}`);
        return;
    }

    // Make query request from SQL connection.
    connection.query(`SHOW COLUMNS FROM ${table}`, (err, rows, fields) => {
        if(err){
            console.log(err);
            return res.json({data: null, columns: null });
        }else{
            console.log(`Successful Column Query from table: ${table}`);
            return res.json({data: rows});
        }
    })
})

// Respond to searched values from a column with in a table.
app.get('/ag_db/search', (req, res) => {
    const {name, phone, address, birthplace, age, table, searchCol, searchVal } = req.query;
    let condition = `${searchCol}="${searchVal}"`;

    connection.query(`SELECT * FROM ${table} WHERE ${condition}`, (err, rows, fields) => {
        if(err){
            console.log(err);
            return res.json({data: null, columns: null });
        }else{
            console.log(`Successful Query from table: ${table} | search val: ${searchVal}`)
            return res.json({data: rows, columns: fields});
        }
    });

})

// Respond to /artists directory (w/ query values).
app.get('/artists', (req, res) => {
    // Decode query (INCOMPLETE).
    //const decodedQuery = Buffer.from(req.query, 'base64').toString();
    //console.log(req.query)
    //console.log(decodedQuery);
    
    // Parse request params (NOT FOR THIS REQUEST/RESPONSE).
    const {name, phone, address, birthplace, age, table} = req.query;
    
    // Quit if no valid table to query.
    if(!table){
        console.log(`Invalid table: ${table}`);
        return;
    }

    // Make query request from SQL connection.
    connection.query(`SELECT * FROM ${table};`, (err, rows, fields) => {
        if(err){
            console.log(err);
            return res.json({data: null, columns: null });
        }else{
            console.log(`Successful Query from table: ${table}`);
            return res.json({data: rows, columns: fields});
        }
    })
})

// -- Begin listening for client requests (start server) -- //
app.listen(4000, () => {
    console.log('Server now listening on port: 4000');
})