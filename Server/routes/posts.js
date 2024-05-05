import express from 'express';
import * as postsDl from "../../DL/posts.js"
import * as commentsDl from "../../DL/comments.js"
const router = express.Router();
router.get(`/:detail=:value`, async (req, res) => {
  try {
    const [rows] = await userDl.getPostByDetail(req.params.detail, req.params.value);
    if (rows.length === 0) {
      return res.status(404).send("user not found"); // Not Found status
    }
    res.status(200).send(rows);
  } catch (err) {
    res.status(500).send("Error retrieving users");
  }
});
// Retrieve all posts
router.get('/', async (req, res) => {
  try {
    const [rows] = await postsDl.getAllPosts();
    res.status(200).send(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving posts");
  }
});
// Retrieve a single post by ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await postsDl.getPostsByUserId(req.params.id);
    if (rows.length === 0) {
      return res.status(404).send("Post not found");
    }
    res.status(200).send(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving post");
  }
});
router.get('/:id/comments', async (req, res) => {
  try {
    const [rows] = await commentsDl.getCommentsByPostId(req.params.id)
    res.status(200).send(rows);
  }
  catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving post");
  }
});
router.get('/:postId/comments/:id', async (req, res) => {
  try {
    const [rows] = await commentsDl.getCommentsById(req.params.id);
    res.status(200).send(rows);
  }
  catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving post");
  }
});
// Create a new post
router.post('/', async (req, res) => {
  try {
    const post = await postsDl.addPost(req.body);
    res.status(200).send(post[0]);
  } catch (err) {
    console.error(err);
    res.status(400).send("Error creating post");
  }
});

// Update an existing post
router.put('/:id', async (req, res) => {
  try {
    const [post, rows] = await postsDl.updatePost(req.body, req.params.id)
    if (rows > 0) {
      res.status(200).send(post[0]);
    } else {
      res.status(404).send("Post not found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating post");
  }
});
router.post('/:id/comments', async (req, res) => {
  try {
    const comment = await commentsDl.addComment(req.body, req.params.id)
    res.status(200).send(comment); // Created status
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating comment item");
  }
});
// Delete a post
router.delete('/:id', async (req, res) => {
  try {
    const [delTodo] = await postsDl.getPostById(req.params.id)
    if (delTodo.length == 0) {
      res.status(404).send("post not found")
    }
    postsDl.deletePost(req.params.id)
    res.status(200).send(); // No Content status for successful deletion

  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting post");
  }
});

export { router };
