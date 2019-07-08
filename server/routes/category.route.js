const express = require('express');
const passport = require('passport');
const upload = require('../middleware/upload');
const controllers = require('../controllers/category.controller');

const router = express.Router();

router.get('/', passport.authenticate('jwt', { session: false }), controllers.getAll);
router.get('/:id', controllers.getById);
router.delete('/:id', controllers.remove);
router.post('/', passport.authenticate('jwt', { session: false }), upload.single('image'), controllers.create);
router.patch('/:id', upload.single('image'), controllers.update);

module.exports = router;
