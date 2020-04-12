/**
 * Creating a Schema for the 'trades' collection in 'trading-journal' database 
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TradesSchema = new Schema({
    // determining the data type for used values
    status: String, // active or closed
    symbole: String, // Forex symbole
    direction: String, // buy or sell (long or short)
    entryPrice: Number,
    exitPrice: Number,
    stopLoss: Number,
    firstTraget: Number,
    secondTarget: Number,
    thirdTarged: Number,
    created: {
        type: Date,
        default: Date.now
    },
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

module.exports = mongoose.model('Trades', TradesSchema);