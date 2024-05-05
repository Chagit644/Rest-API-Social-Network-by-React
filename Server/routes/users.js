import express from 'express';
import * as userDl from '../../DL/users.js'
import * as todoDl from '../../DL/todos.js'
import * as postDl from '../../DL/posts.js'
import * as passwordDl from '../../DL/passwords.js'
const router = express.Router();
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const userName = await userDl.getUserByDetail("username", username);
        const [rows] = await passwordDl.checkPassword(userName[0][0].id, password);
        if (rows.length === 0) {
            return res.status(404).send("Incorrect username or password");
        }
        const user = await userDl.getUserById([rows[0].user_id]);
        return res.status(200).json(user[0]); // OK status with user data
    } catch (err) {
        return res.status(500).send("An error occurred. Please try again later"); // Internal Server Error status
    }
});
router.get(`/:detail=:value`, async (req, res) => {
    try {
        const [rows] = await userDl.getUserByDetail(req.params.detail, req.params.value);
        if (rows.length === 0) {
            return res.status(404).send("user not found"); // Not Found status
        }
        res.status(200).send(rows);
    } catch (err) {
        res.status(500).send("Error retrieving users");
    }
});
router.get('/:id', async (req, res) => {
    try {
        const [rows] = await userDl.getUserById(req.params.id);
        if (rows.length === 0) {
            return res.status(404).send("User not found"); // Not Found status
        }
        res.status(200).send(rows[0]);
    } catch (err) {
        res.status(500).send("Error retrieving user");
    }
});
// Retrieving all users
router.get('/', async (req, res) => {
    try {
        const [rows] = await userDl.getAllUsers();
        if (rows[0].length == 0) {
            res.status(404).send("No users!")
        }
        res.status(200).send(rows);
    } catch (err) {
        res.status(500).send("Error retrieving users");
    }
});
// Retrieving a single user by ID
router.get('/:id/todos', async (req, res) => {
    try {
        const [rows] = await todoDl.getTodosById(req.params.id);
        res.status(200).send(rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error retrieving todos");
    }
});
router.get('/:id/posts', async (req, res) => {
    try {
        const [rows] = await postDl.getPostsByUserId(req.params.id);
        res.status(200).send(rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error retrieving todos");
    }
});
// Creating a new user
router.post('/', async (req, res) => {
    try {
        const user = await userDl.addUser(req.body);
        res.status(200).json(user); // Created status

    } catch (err) {
        console.error(err);
        res.sendStatus(400).send("Error creating user"); // Bad Request status for invalid data
    }
});

export { router };
