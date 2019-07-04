const express = require('express');
const controllers = require('../controllers/analitycs.controller');
const router = express.Router();

router.get('/overview', controllers.overview);
router.get('/analytics', controllers.analytics);

module.exports = router;