/**
 * Creating a Schema for the 'trades' collection in 'trading-journal' database 
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TradesSchema = new Schema({
    // determining the data type for used values
    tradeNumber:            {type: Number, required: true},
    numberPositions:        {type: Number, required: true, default: 2},
    type:                   {type: String, required: true, default: 'Pending Order'}, // "Pending Order" or "Market Order"
    status:                 {type: String, required: true, default: 'Open'}, // Open, Active or Closed
    symbole:                {type: String, required: true, max: 6}, // Forex symbole
    setup:                  {type: String, required: true}, // Pinbar, 2BarReversal, ...
    timeframe:              {type: String, required: true, default: 'D1'}, // M1, M5, M15, M30, H1, H4, D1, W1, M1
    rating:                 {type: Number}, // rating of the setup, calculated through serveral factors
    direction:              {type: String, required: true, max: 4}, // buy or sell (long or short)
    volume:                 {type: Number, required: true, default: 0.01}, // Lots
    entryPrice:             {type: Number, required: true},
    exitPrice:              {type: Number, required: true},
    stopLoss:               {type: Number, required: true},
    firstTraget:            {type: Number, required: true},
    secondTarget:           {type: Number, required: true},
    thirdTarget:            {type: Number, required: true},
    created:                {type: Date, required: true, default: Date.now},
    entryDate:              {type: Date, required: false, default: Date.now},
    exitDate:               {type: Date, required: false, default: Date.now},
    exitDateFirstTarget:    {type: Date, required: false, default: Date.now},
    exitDateSecondTarget:   {type: Date, required: false, default: Date.now},
    exitDateThirdTarget:    {type: Date, required: false, default: Date.now},
    result:                 {type: String}, // Profit, Loss, BreakEven, Cancelled
    profitLossCurrency:     {type: Number, required: false},
    profitLossPips:         {type: Number, required: false},
    notesEntry:             {type: String, required: true},
    notesExit:              {type: String},
    notesGeneral:           {type: String},
    accordingToPlan:        {type: String, required: false}, // Yes or No
    imageEntry:             {type: Buffer},
    imageExit:              {type: Buffer}
});

// Set the collection 'trades' for this Schema
TradesSchema.set('collection', 'trades');

module.exports = mongoose.model('Trades', TradesSchema);