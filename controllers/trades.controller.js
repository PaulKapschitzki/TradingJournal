const Trades = require('../models/trades.model');

// Simple version, without validation or sanitation
exports.test = (req, res) => {
    res.send('Greetings from the Test controller');
};

// Display Trade create form on GET
exports.trade_create_get = (req, res, next) => {
    res.render('tradeEntryForm', { title: 'Enter New Trade!' });
};

// Add mapping for each item of trades.modules.js Schema - Create
exports.trade_create_post = (req, res, next) => {
    // validate request
    let trade = new Trades({
        tradeNumber:            req.body.tradeNumber,
        numberPositions:        req.body.numberPositions,
        position:               req.body.position,
        type:                   req.body.type,
        pendingOrderType:       req.body.pendingOrderType,
        status:                 req.body.status,
        symbole:                req.body.symbole,
        setup:                  req.body.setup,
        timeframe:              req.body.timeframe,
        // rating is calculated
        direction:              req.body.direction,
        volume:                 req.body.volume,
        entryPrice:             req.body.entryPrice,
        exitPrice:              req.body.exitPrice,
        stopLoss:               req.body.stopLoss,
        firstTraget:            req.body.firstTraget,
        secondTarget:           req.body.secondTarget,
        thirdTarget:            req.body.thirdTarget,
        entryDate:              req.body.entryDate,
        exitDate:               req.body.exitDate,
        exitDateFirstTarget:    req.body.exitDateFirstTarget,
        exitDateSecondTarget:   req.body.exitDateSecondTarget,
        exitDateThirdTarget:    req.body.exitDateThirdTarget,
        result:                 req.body.result,
        profitLossCurrency:     req.body.profitLossCurrency,
        profitLossPips:         req.body.profitLossPips,
        notesEntry:             req.body.notesEntry,
        notesExit:              req.body.notesExit,
        notesGeneral:           req.body.notesGeneral,
        accordingToPlan:        req.body.accordingToPlan,
        imageEntry:             req.body.imageEntry,
        imageExit:              req.body.imageExit
    });

    trade.save()
        .then(data => {
            // res.redirect('/all_trades')
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
    
    // next(); // Incase the request doesn't get completed, the next method is called

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
            
            res.render('tradeHistory', { title: 'Trade History' });
            // res.json(data);
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