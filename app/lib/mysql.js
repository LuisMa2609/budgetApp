// const connection = await mysql.createConnection({
//   host: env.MYSQL_HOST,
//   user: env.MYSQL_USER,
//   password: env.MYSQL_PASSWORD,
//   database: env.MYSQL_DATABASE
// });

// lib/mysql.js
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;