/**
 * Creating a Schema for the 'trades' collection in 'trading-journal' database 
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TradesSchema = new Schema({
    // determining the data type for used values
    tradeNumber:                {type: Number, required: true},
    numberPositions:            {type: Number, min: [1, 'Must have at lease one position'], required: [true, 'Why no positions?'], default: 2},
    type:                       {type: String, required: true, enum: ['Pending Order', 'Market Order'], default: 'Pending Order'}, // "Pending Order" or "Market Order"
    pendingOrderType:           {type: String, required: false, enum: ['Buy Limit', 'Buy Stop', 'Sell Limit', 'Sell Stop']},
    status:                     {type: String, required: true, enum: ['Open', 'Active', 'Closed'], default: 'Open'}, // Open, Active or Closed
    symbole:                    {type: String, required: true, max: 6}, // Forex symbole
    setup:                      {type: String, required: true}, // Pinbar, 2BarReversal, ...
    timeframe:                  {type: String, required: true, enum: ['M1', 'M5', 'M15', 'M30', 'H1', 'H4', 'D1', 'W1', 'M1'], default: 'D1'}, // M1, M5, M15, M30, H1, H4, D1, W1, M1
    rating:                     {type: Number}, // rating of the setup, calculated through serveral factors
    direction:                  {type: String, required: true, max: 4, enum: ['Buy', 'Sell']}, // buy or sell (long or short)
    volume:                     {type: Number, required: true, default: 0.10}, // Lots
    entryPrice:                 {type: Number, required: true},
    stopLoss:                   {type: Number, required: true},
    takeProfit:                 {type: Number, required: false},
    riskReturnRatio:            {type: Number},
    created:                    {type: Date, required: true, default: Date.now},
    entryDate:                  {type: Date, required: false, default: Date.now},
    exitDate:                   {type: Date, required: false, default: Date.now},
    result:                     {type: String, required: false, enum: ['Profit', 'Loss', 'Breakeven', 'Cancelled'],}, // Profit, Loss, BreakEven, Cancelled
    profitLossCurrency:         {type: Number, required: false},
    profitLossPips:             {type: Number, required: false},
    commentsEntry:              {type: String, required: true},
    commentsExit:               {type: String},
    commentsGeneral:            {type: String},
    accordingToPlan:            {type: String, required: false}, // Yes or No
    imageEntry:                 {type: Buffer},
    imageExit:                  {type: Buffer}
});

// Set the collection 'trades' for this Schema
TradesSchema.set('collection', 'trades');

module.exports = mongoose.model('Trades', TradesSchema);