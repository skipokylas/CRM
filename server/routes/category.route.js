const express = require('express');
const controllers = require('../controllers/category.controller');
const router = express.Router();

router.get('/', controllers.getAll);
router.get('/:id', controllers.getById);
router.delete('/:id', controllers.remove);
router.patch('/', controllers.create);
router.post('/:id', controllers.update);


module.exports = router;