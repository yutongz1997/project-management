import mysql from 'mysql';
import databaseConfig from './config.js';


const connection = mysql.createConnection(databaseConfig);
connection.connect(err => {
    if (err) {
        throw err;
    }
    console.log('Successfully connected to the database');
});


export default connection;
