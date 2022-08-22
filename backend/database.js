const mysql = require('mysql');
const databaseConfig = require('./config');


const connection = mysql.createConnection(databaseConfig);
connection.connect(err => {
    if (err) {
        throw err;
    }
    console.log('Successfully connected to the database');
});

module.exports = connection;
