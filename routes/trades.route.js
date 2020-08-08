/**
 * Route for showing all trades in history and adding new trades
 * New trades is perhaps temporary and will be put into it's own route later
 */
const express = require('express');
const router = express.Router();

// Require the trades controller
const trades_controller = require('../controllers/trades.controller');

// A simple test url to check that all of our files ar communicating correctly
router.get('/test', trades_controller.test);

// Get all trades
router.get('/all_trades', trades_controller.all_trades);

// GET request for creating a Trade. NOTE This mus come before route that displays Trades (uses id)
router.get('/create', trades_controller.trade_create_get);

// POST request for creating a new trade - Create route
router.post('/create', trades_controller.trade_create_post);

// Read one item from database by id: - Read route
router.get('/:id', trades_controller.trade_detail);

// Update item in database - Update route
router.put('/:id/edit', trades_controller.trade_update);

// Delete an item in the database - Delete route
router.delete('/:id/delete', trades_controller.trade_delete);

// Pre-Trade Check List
// !!! will be separated later
router.get('/trade_check_list', trades_controller.trade_check_list);

module.exports = router;