const Trades = require('../models/trades.model');

// Simple version, without validation or sanitation
exports.test = (req, res) => {
    res.send('Greetings from the Test controller');
};

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
        res.send('New trade created successfully!');
    })
}