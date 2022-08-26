import mysql from 'mysql2';
import poolConfig from './config.js';


const pool = mysql.createPool(poolConfig).promise();

export default pool;
