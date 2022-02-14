const express = require('express');
const router = express.Router();
const { Todo } = require('../mongo');

router.get('/', async (req, res) => {
    const todos = await Todo.find({});

    res.send({
        added_todos: todos.length
    });
});

module.exports = router;
