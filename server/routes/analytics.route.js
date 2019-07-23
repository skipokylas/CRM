const express = require('express');
const passport = require('passport');
const controllers = require('../controllers/analitycs.controller');


const router = express.Router();

router.get('/overview', passport.authenticate('jwt', { session: false }), controllers.overview);
router.get('/analytics', passport.authenticate('jwt', { session: false }), controllers.analytics);

module.exports = router;
