const express = require('express');
const passport = require('passport');
const images = require('../middleware/images');
const controllers = require('../controllers/category.controller');

const router = express.Router();

router.get('/', passport.authenticate('jwt', { session: false }), controllers.getAll);
router.get('/:id', controllers.getById);
router.delete('/:id', controllers.remove);
router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    images.multer.single('image'),
    images.sendUploadToGCS,
    controllers.create,
);
router.patch(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    images.multer.single('image'),
    images.sendUploadToGCS,
    controllers.update,
);

module.exports = router;
