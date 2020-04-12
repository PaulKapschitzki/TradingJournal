// by default the "index.js" file (this file) will be run
var mongoose = require("mongoose");

// connect to local mongodb "trading-journal"
mongoose.set('debug', true);
mongoose.connect('mongodb://localhost:27017/trading-journal', { useUnifiedTopology: true });
//mongoose.connect('mongodb://localhost/trading-journal');

// make available the use of javascript promises like "then" and "catch" (standard js promises)
mongoose.Promise = Promise;

// requiring the trades.js file and exporting that out
module.exports.Trades = require("./trades.model");