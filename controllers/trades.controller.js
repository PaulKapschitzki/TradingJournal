const Trades = require('../models/trades.model');

// Simple version, without validation or sanitation
exports.test = (req, res) => {
    res.send('Greetings from the Test controller');
};

// Add mapping for each item of trades.modules.js Schema - Create
exports.new_trade = (req, res) => {
    let trade = new Trades({
        symbole: req.body.symbole,
        direction: req.body.direction,
        entryPrice: req.body.entryPrice
    });

    trade.save( err => {
        if (err) {
            return next(err);
        }
        // res.send('New trade created successfully!');
        res.redirect('/');
    });
};

// trade_detail controller - Read
exports.trade_detail = (req, res) => {
    Trades.findById(req.params.id, (err, trade) => {
        if (err) return next(err);
        res.send(trade);
    });
};

// trade_update controller - Update
exports.trade_update = (req, res) => {
    Trades.findByIdAndUpdate(req.params.id, {$set: req.body}, (err, trade) => {
        if (err) return next(err);
        res.send('Trade updated successfully!');
    });
};

// trade_delete controller - Delete
exports.trade_delete = (req, res) => {
    Trades.findOneAndRemove(req.params.id, (err, trade) => {
        if (err) return next(err);
        res.send('Trade deleted successfully!');
    });
};