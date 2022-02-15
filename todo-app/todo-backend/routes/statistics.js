const express = require('express');
const router = express.Router();
const { getAsync } = require('../redis');
const configs = require('../util/config');

router.get('/', async (_, res) => {
    const currentCount = (await getAsync(configs.REDIS_COUNTER_KEY)) ?? 0;
    const json = { addedTodos: parseInt(currentCount) };
    res.send(json);
});

module.exports = router;
