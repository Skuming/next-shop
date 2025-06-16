import mysql from "mysql2/promise";

export const pool = mysql.createPool({
  connectionLimit: 5,
  queueLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
});
