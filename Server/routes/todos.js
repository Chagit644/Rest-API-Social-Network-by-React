import express from 'express';
import * as todosDl from '../../DL/todos.js'
const router = express.Router();

router.get(`/:detail=:value`, async (req, res) => {
    try {
        const [rows] = await userDl.getTodoByDetail(req.params.detail, req.params.value);
        if (rows.length === 0) {
            return res.status(404).send("user not found"); // Not Found status
        }
        res.status(200).send(rows);
    } catch (err) {
        res.status(500).send("Error retrieving users");
    }
});
router.get('/', async (req, res) => {
    try {
        const [rows] = await todosDl.getAllTodos();
        return res.status(200).send(rows);
    } catch (err) {
        return res.status(500).send("error by server");
    }
});

router.get('/:id', async (req, res) => {
    try {
        const [rows] = await todosDl.getTodoById(req.params.id);
        // Check if any todo items were found with the specified ID
        if (rows.length === 0) {
            res.status(404).send("Todo item not found"); // Not Found status
        }
        res.status(200).send(rows); // Successful response
    } catch (err) {
        res.status(500).send("Error by server"); // Internal Server Error
    }
});
router.post('/', async (req, res) => {
    try {
        const todo = await todosDl.addTodo(req.body)
        return res.status(200).send(todo[0]); // Created status
    } catch (err) {
        return res.status(500).send("Error creating todo item");
    }
});

router.put('/:id', async (req, res) => {
    try {
        const [updateTodo, affectedRows] = await todosDl.updateTodo(req.body, req.params.id)
        if (affectedRows > 0) {
            return res.status(200).send(updateTodo[0]); // OK status
        } else {
            return res.status(404).send("Todo item not found"); // Not Found status
        }
    } catch (err) {
        return res.status(500).send("Error updating todo item");
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const [getTodo] = await todosDl.getTodoById(req.params.id);
        if (getTodo.length == 0) {
            return res.status(202).send("Todo item not found"); // Not Found status
        }
        todosDl.deleteTodo(req.params.id)
        return res.status(200).send("Todo deleted!"); // Not Found status
    } catch (err) {
        return res.status(500).send("Error deleting todo item");
    }
});

export { router };