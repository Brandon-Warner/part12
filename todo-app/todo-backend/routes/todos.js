const express = require('express');
const { Todo } = require('../mongo');
const { getAsync, setAsync } = require('../redis');
const { REDIS_COUNTER_KEY } = require('../util/config');
const router = express.Router();

const incrementTodoCounter = async () => {
    const currentCount = await getAsync(REDIS_COUNTER_KEY);

    const nextCount = currentCount ? parseInt(currentCount) + 1 : 1;

    await setAsync(REDIS_COUNTER_KEY, nextCount);
};

/* GET todos listing. */
router.get('/', async (_, res) => {
    const todos = await Todo.find({});
    res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
    const todo = await Todo.create({
        text: req.body.text,
        done: false
    });

    incrementTodoCounter();

    res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
    const { id } = req.params;
    req.todo = await Todo.findById(id);
    if (!req.todo) return res.sendStatus(404);

    next();
};

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
    await req.todo.delete();
    res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
    const singleTodo = await req.todo;
    res.send(singleTodo);
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
    console.log(req.query);
    const updatedTodo = {
        text: req.query.text,
        done: req.query.done
    };
    const newTodo = await Todo.findByIdAndUpdate(req.todo, updatedTodo);

    res.send(newTodo);
});

router.use('/:id', findByIdMiddleware, singleRouter);

module.exports = router;
