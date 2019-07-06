const express = require('express');
const controllers = require('../controllers/order.controller');

const router = express.Router();

router.get('/', controllers.getAll);
router.post('/', controllers.create);

module.exports = router;
