const express = require('express');
const bodyParser = require('body-parser'); // Middleware
// const MongoClient = require('mongodb').MongoClient; // For using mongodb with the native driver instead of mongoose
const mongoose = require('mongoose');
// const url = 'mongodb://127.0.0.1:27017/trading-journal';
const trades = require('./routes/trades.route'); // Import routes for trades
const app = express();
const path = require('path');

// Set template tool ejs (alterative: jade aka pug, or handlebars(from express))
app.set('views', path.join(__dirname, 'views'));
// as template engine
app.set('view engine', 'ejs');

// Make sure you place body-parser before the CRUD handlers!
// body-parser is a middleware to tidy up the request object before use
// urlencoded extracts data from <form> element and adds them to
// 'body' property in the request object
app.use(bodyParser.urlencoded({extended: true}));

// Use trades route
app.use('/trades', trades);

// Connecting to database
mongoose.connect(url, { useNewUrlParser: true },(err) => {
    if (!err) { console.log("MongoDB Connection Succeded!");}
    else {
        console.log("An Error Occured: " + err);
    }
}); // or useNewUrlParser: true

// Check if connection works - Alternative way
const db = mongoose.connection;
// db.once('open', _ => {
//     console.log('Database connected: ', url);
// });
// // Catch connection error
// db.on('error', err => {
//     console.log('connection error: ', err);
// });

// Basic get function
app.get("/", (req, res) => {
    // res.send("Hello Trading Journal");
    // console.log("dirname: " + __dirname);
    db.collection('trades').find().toArray()
        .then(results => {
            // render database entries to index page (<%= trades %>)
            res.render('index.ejs', { trades: results });
        })
        .catch(error => console.log(error));
    // res.sendFile(__dirname + '/views/index.html'); //Note: __dirname is the directory you are in.
    // res.render('index.ejs', {});
});

// // POST route for writing into database
// app.post('/trades', (req, res) => {
//     // console.log("Posting my trades!");
//     // insertOne is not supported by mongoose model trades.insertOne(req, body)
//     trades.create(req.body)
//     .then(result => {
//         console.log(result);
//     })
//     .catch(error => console.log(error))
// });

const port = process.env.PORT || 3000;
// Setup listener
app.listen(port, () => {
    console.log('listening on ' + port);
});