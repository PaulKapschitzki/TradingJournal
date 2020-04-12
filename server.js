const express = require('express');
const bodyParser = require('body-parser'); // Middleware
// const MongoClient = require('mongodb').MongoClient; // For using mongodb with the native driver instead of mongoose
const mongoose = require('mongoose');
const url = 'mongodb://127.0.0.1:27017/trading-journal';
const trades = require('./routes/trades.route'); // Import routes for trades
const app = express();
const port = process.env.PORT || 3000;

// Make sure you place body-parser before the CRUD handlers!
// body-parser is a middleware to tidy up the request object before use
// urlencoded extracts data from <form> element and adds them to
// 'body' property in the request object
app.use(bodyParser.urlencoded({extended: true}));

// Use trades route
app.use('/trades', trades);

// Connecting to database
mongoose.connect(url, { useNewUrlParser: true }); // or useNewUrlParser: true

// Check if connection works
const db = mongoose.connection;
db.once('open', _ => {
    console.log('Database connected: ', url);
});
// Catch connection error
db.on('error', err => {
    console.log('connection error: ', err);
});

// Check if connection works with promises
// db.connect('open')
//     .then(trade => {
//         // Put Express handlers into 'then' to access db variable
//         // console.log(trade)
//         const tradesCollection = db.collection('trades');
//     })
//     .catch(error => { console.log(error) })

// Basic get function
app.get("/", (req, res) => {
    // res.send("Hello Trading Journal");
    // console.log("dirname: " + __dirname);
    res.sendFile(__dirname + '/views/index.html'); //Note: __dirname is the directory you are in.
});

// POST route for writing into database
app.post('/trades', (req, res) => {
    // console.log("Posting my trades!");
    tradesCollection.insertOne(req, body)
        .then(result => {
            console.log(result);
        })
        .catch(error => console.log(error))
});

// Setup listener
app.listen(port, () => {
    console.log('listening on ' + port);
});