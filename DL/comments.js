import pool from '../Server/server.js';

export function getAllComments() {
    return pool.query("SELECT * FROM comments")
}
export function getCommentsByPostId(id) {
    return pool.query("SELECT * FROM comments WHERE post_id =?", [id])
}
export function getCommentsById(id) {
    return pool.query("SELECT * FROM comments WHERE id =?", [id])
}
export async function addComment(comment, id) {
    const [rows] = await pool.query(`INSERT INTO comments(post_id,name,email,body) VALUES(${id},"${comment.name}","${comment.email}","${comment.body}")`)
    const comment1 = await pool.query('SELECT * FROM comments WHERE id=?', [rows.insertId]);
    return comment1[0]
}
export async function updateComment(comment) {
    const [rows] = await pool.query(`UPDATE comments SET body="${comment.body}" WHERE id = ${comment.id}`);
    return [await pool.query('SELECT * FROM comments WHERE id=?', [comment.id]), rows.affectedRows];
}
export async function deleteComment(id) {
    return await pool.query(`DELETE FROM comments WHERE id = ${id}`);
}
export async function getCommentByDetail(detail, value) {
    return await pool.query(`SELECT * FROM users WHERE ${detail} = '${value}'`);
}