/**
 * Route for showing all trades in history and adding new trades
 * New trades is perhaps temporary and will be put into it's own route later
 */
const express = require('express');
const router = express.Router();

// Require the trades controller
const trades_controller = require('../controllers/trades.controller');

// A simple test url to check that all of our files ar communicating correctly
// router.get('/test', trades_controller.test);

// Get all trades
router.get('/all_trades', trades_controller.all_trades);

// Url to create a new trade entry - Create route
// The submit form needs to be on this page
router.post('/create', trades_controller.trade_create);

// Read one item from database by id: - Read route
router.get('/:id', trades_controller.trade_detail);

// Update item in database - Update route
router.put('/:id/edit', trades_controller.trade_update);

// Delete an item in the database - Delete route
router.delete('/:id/delete', trades_controller.trade_delete);

module.exports = router;