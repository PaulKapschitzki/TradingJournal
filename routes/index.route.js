const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Trading Journal' });
});

// Pre-Trade Check List
// !!! will be separated later
router.get('/trade_check_list', (req, res, next) => {
  res.render('tradeCheckList', { title: 'Pre-Trade Check List'});
});

module.exports = router;