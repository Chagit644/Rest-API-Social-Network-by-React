import pool from '../Server/server.js';

export function getPasswordById(id) {
    return pool.query("SELECT * FROM users WHERE id =?", [id])
}
export function checkPassword(id, password) {
    return pool.query(`SELECT user_id FROM passwords WHERE user_id = ? AND password = ?`, [id, password])
}
export function addPassword(user) {
    return pool.query(`INSERT INTO users (name, username, email, phone, city, company) VALUES (?, ?, ?, ?, ?, ?)`,
        [user.name, user.username, user.email, user.phone, user.city, user.company]);
}