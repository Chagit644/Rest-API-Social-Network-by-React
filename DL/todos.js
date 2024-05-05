import pool from '../Server/server.js';

export function getAllTodos() {
    return pool.query("SELECT * FROM users")
}
export function getTodosById(id) {
    return pool.query("SELECT * FROM todos WHERE user_id =?", [id])
}
export function getTodoById(id) {
    return pool.query("SELECT * FROM todos WHERE id =?", [id])
}
export async function addTodo(todo) {
    const [rows] = await pool.query(`INSERT INTO todos (user_id, title, completed) VALUES (${todo.user_id}, "${todo.title}", ${todo.completed})`);
    return await pool.query('SELECT * FROM todos WHERE id=?', [rows.insertId]);
}
export async function updateTodo(todo, id) {
    const [rows] = await pool.query(`UPDATE todos SET completed = ${todo.completed}, title = "${todo.title}" WHERE id = ${id}`);
    return [await pool.query('SELECT * FROM todos WHERE id=?', [id]), rows.affectedRows];
}
export async function deleteTodo(id) {
    return await pool.query(`DELETE FROM todos WHERE id = ?`, [id]);
}
export async function getTodoByDetail(detail, value) {
    return await pool.query(`SELECT * FROM users WHERE ${detail} = '${value}'`);
}