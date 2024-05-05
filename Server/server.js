import dotenv from 'dotenv';
dotenv.config({ path: "../.env" });
import mysql from 'mysql2'
import express from 'express';
import cors from 'cors';
import { router as usersRouter } from './routes/users.js';
import { router as todosRouter } from './routes/todos.js';
import { router as postsRouter } from './routes/posts.js';
import { router as commentsRouter } from './routes/comments.js';


export const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "db"
}).promise();

const server = express();
server.use((req, res, next) => {
    next();
})
server.use((cors({ origin: '*' })));
server.use(express.json());

server.use('/users', usersRouter);
server.use('/todos', todosRouter);
server.use('/posts', postsRouter);
server.use('/comments', commentsRouter);

server.listen(1234, () => {
    console.log(`listening to requests at http://localhost:1234`);
});
export default pool;
