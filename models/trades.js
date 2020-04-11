/**
 * Creating a Schema for the 'trades' collection in 'trading-journal' database 
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tradesSchema = new Schema({
    // determining the data type for used values
    symbole: String,
    direction: String,
    entryPrice: Number,
    exitPrice: Number,
    stopLoss: Number,
    firstTraget: Number,
    secondTarget: Number,
    thirdTarged: Number,
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