// import mysql from 'mysql2/promise'

import pool from "../lib/mysql";

export default async function handler(req, res) {
  try {
    const [rows] = await pool.execute('SELECT * FROM trabajos');
    res.status(200).json(rows);
    console.log("pool res", res);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: 'Error al obtener los trabajos' });
  }
}
