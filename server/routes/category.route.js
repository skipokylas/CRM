const express = require('express');
const controllers = require('../controllers/category.controller');
const passport = require('passport');

const router = express.Router();

router.get('/', passport.authenticate('jwt', { session: false }), controllers.getAll);
router.get('/:id', controllers.getById);
router.delete('/:id', controllers.remove);
router.post('/', controllers.create);
router.patch('/:id', controllers.update);

module.exports = router;
