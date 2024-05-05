import pool from '../Server/server.js';

export function getAllUsers() {
  return pool.query("SELECT * FROM users")
}
export function getUserById(id) {
  return pool.query("SELECT * FROM users WHERE id =?", [id])
}
export async function addUser(user) {
  const [rows] = await pool.query(`INSERT INTO users (name, username, email, phone, city, company) VALUES (?, ?, ?, ?, ?, ?)`,
    [user.name, user.username, user.email, user.phone, user.city, user.company]);
  pool.query(`INSERT INTO passwords (user_id, password) VALUES (${rows.insertId}, '${user.password}')`);
  return getUserById(rows.insertId);
}
export async function getUserByDetail(detail, value) {
  return await pool.query(`SELECT * FROM users WHERE ${detail} = '${value}'`);
}