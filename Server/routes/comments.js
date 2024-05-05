import express from 'express';
import * as commentDl from '../../DL/comments.js'
const router = express.Router();

router.get(`/:detail=:value`, async (req, res) => {
    try {
        const [rows] = await userDl.getCommentByDetail(req.params.detail, req.params.value);
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
        const [rows] = await commentDl.getAllComments();
        res.status(200).send(rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("error by server");
    }
});

router.get('/:id', async (req, res) => {
    try {
        const [rows] = await commentDl.getCommentsById(req.params.id)
        // Check if any todo items were found with the specified ID
        if (rows.length === 0) {
            return res.status(404).send("comments item not found"); // Not Found status
        }

        res.status(200).send(rows); // Successful response
    } catch (err) {
        console.error(err);
        res.status(500).send("Error by server"); // Internal Server Error
    }
});

router.post('/', async (req, res) => {
    console.log(req.body);
    try {
        const comment = await commentDl.addComment(req.body);
        res.status(200).send(comment[0]); // Created status
    } catch (err) {
        console.error(err);
        res.status(500).send("Error creating comment item");
    }
});

router.put('/:id', async (req, res) => {
    console.log(req.body.body);
    try {
        const [rows, affectedRows] = await commentDl.updateComment(req.body)
        console.log(affectedRows);
        if (affectedRows > 0) {
            res.status(200).send(rows[0]); // OK status
        } else {
            res.status(404).send("comment item not found"); // Not Found status
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating comment item");
    }
});

router.delete('/:id', async (req, res) => {
    try {
        commentDl.deleteComment(req.params.id);
        res.status(200).send("comment item deleted successfully"); // No Content status
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting comments item");
    }
});

export { router };