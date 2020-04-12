/**
 * Route for showing all trades in history and adding new trades
 * New trades is perhaps temporary and will be put into it's own route later
 */
const express = require('express');
const router = express.Router();

// Require the controllers
const trades_controller = require('../controllers/trades.controller');

// A simple test url to check that all of our files ar communicating correctly
router.get('/test', trades_controller.test);

module.exports = router;