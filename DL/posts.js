import pool from '../Server/server.js';

export function getPostsByUserId(id) {
    return pool.query("SELECT * FROM posts WHERE user_id=?", [id]);
}

export function getAllPosts() {
    return pool.query("SELECT * FROM posts");
}

export async function addPost(post) {
    const [rows] = await pool.query(`
      INSERT INTO posts (user_id, title, body) 
      VALUES (?, ?, ?)
    `, [post.userId, post.title, post.body]);
    return await pool.query('SELECT * FROM posts WHERE id=?', [rows.insertId]);
}

export async function updatePost(post, id) {
    const [rows] = await pool.query(` UPDATE posts SET title = ?, body = ? WHERE id = ?`, [post.title, post.body, id]);
    return [await pool.query('SELECT * FROM posts WHERE id=?', [id]), rows.affectedRows];
}
export async function deletePost(id) {
    await pool.query(`DELETE FROM comments WHERE post_id =?`, [id]);
    await pool.query(`DELETE FROM posts WHERE id = ?`, [id]);
}
export async function getPostById(id) {
    return await pool.query(`SELECT * FROM posts where id=${id}`)
}
export async function getPostByDetail(detail, value) {
    return await pool.query(`SELECT * FROM users WHERE ${detail} = '${value}'`);
}