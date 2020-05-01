/**
 * Creating a Schema for the 'trades' collection in 'trading-journal' database 
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TradesSchema = new Schema({
    // determining the data type for used values
    numberPositions: {type: Number, required: true, default: 2},
    status: {type: String, required: true, default: 'active'}, // active or closed
    symbole: {type: String, required: true, max: 6}, // Forex symbole
    direction: {type: String, required: true, max: 4}, // buy or sell (long or short)
    entryPrice: {type: Number, required: true},
    exitPrice: {type: Number, required: true},
    stopLoss: {type: Number, required: true},
    firstTraget: {type: Number, required: true},
    secondTarget: {type: Number, required: true},
    thirdTarged: {type: Number, required: true},
    created: {type: Date, required: true, default: Date.now},
    entryDate: Date,
    exitDate: Date,
    exitDateFirstTarget: Date,
    exitDateSecondTarget: Date,
    exitDateThirdTarget: Date,
    profitLossCurrency: Number,
    profitLossPips: Number,
    notesEntry: String,
    notesExit: String,
    notesGeneral: String
});

// Set the collection 'trades' for this Schema
TradesSchema.set('collection', 'trades');

module.exports = mongoose.model('Trades', TradesSchema);