const Trades = require('../models/trades.model');

// Simple version, without validation or sanitation
exports.test = (req, res) => {
    res.send('Greetings from the Test controller');
};

// Add mapping for each item of trades.modules.js Schema - Create
exports.trade_create = (req, res) => {
    // validate request
    let trade = new Trades({
        status: req.body.status,
        symbole: req.body.symbole,
        direction: req.body.direction,
        entryPrice: req.body.entryPrice,
        exitPrice: req.body.exitPrice,
        stopLoss: req.body.stopLoss,
        firstTraget: req.body.firstTraget,
        secondTarget: req.body.secondTarget,
        thirdTarged: req.body.thirdTarged,
        entryDate: req.body.entryDate,
        exitDate: req.body.exitDate,
        exitDateFirstTarget: req.body.exitDateFirstTarget,
        exitDateSecondTarget: req.body.exitDateSecondTarget,
        exitDateThirdTarget: req.body.exitDateThirdTarget,
        profitLossCurrency: req.body.profitLossCurrency,
        profitLossPips: req.body.profitLossPips,
        notesEntry: req.body.notesEntry,
        notesExit: req.body.notesExit,
        notesGeneral: req.body.notesGeneral
    });

    trade.save()
        .then(data => {
            res.send({
                success: true,
                message: 'Trade successfully created',
                data: data
            });
        }).catch(err => {
            res.status(500).send({
                success: false,
                message: err.message || 'Some error occured while creating the trade'
        });
    });
    
    // res.send('New trade created successfully!');
    // res.redirect('/');
};

// retrieve and return all trades.
exports.all_trades = (req, res) => {
    Trades.find()
        .then(data => {
            let message = "";
            if (data === undefined || data.length == 0) message = 'No trade found!';
            else message = 'Trades successfully retrieved';
            
            res.send({
                success: true,
                message: message,
                data: data
            });
        }).catch(err => {
            res.status(500).send({
                success: false,
                message: err.message || 'Some error occured while retrieving trades'
        });
    });
}

// trade_detail controller - find single trade with id - Read
exports.trade_detail = (req, res) => {
    Trades.findById(req.params.id)
    .then(data => {
        if(!data) {
            return res.status(404).send({
                success: false,
                message: 'Trade not found with id ' + req.params.id
            });
        }
        res.send({
            success: true,
            message: 'Trade successfully retrieved',
            data: data
        });
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                success: false,
                message: 'Trade not found with id ' + req.params.id
            });
        }
    });
};

// trade_update controller - Update
exports.trade_update = (req, res) => {
    Trades.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, {new: true})
        .then(data => {
            if(!data) {
                return res.status(404).send({
                    success: false,
                    message: 'Trade not found with id ' + req.params.id
                });
            }
            res.send({
                success: true,
                data: data
            });
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                success: false,
                message: 'Trade not found with id ' + req.params.id
            });
        }
        return res.status(500).send({
            success: false,
            message: 'Error updating trade with id ' + req.params.id
        });
    });
};

// trade_delete controller - Delete
exports.trade_delete = (req, res) => {
    Trades.findOneAndRemove(req.params.id)
        .then(data => {
            if(!data) {
                return res.status(404).send({
                    success: false,
                    message: 'Trade not found with id ' + req.params.id
                });
            }
            res.send({
                success: true,
                message: 'Trade successfully deleted!'
            });
        }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                success: false,
                message: 'Trade not found with id ' + req.params.id
            });
        }
        return res.status(500).send({
            success: false,
            message: 'Could not delete trade with id ' + req.params.id
        });
    });
};