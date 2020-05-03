// Entry point for this project
// const createError = require('http-errors');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser'); // Middleware
const logger = require('morgan');

// database connection
const dbConn = require('./lib/db');

const indexRouter = require('./routes/index.route');
const tradesRouter = require('./routes/trades.route');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public/javascript')));
app.use(express.static(path.join(__dirname, 'public/images')));
app.use(express.static(path.join(__dirname, 'public/stylesheets')));

app.use('/', indexRouter);
// app.use('/trades', tradesRouter);

// adds the prefix "/api/trades" to all routes so that in the external routes file "routes/trades.route.js"
// the route router.get("/", function(req, res) {...}); actually is /api/trades/ 
app.use('/api/trades', tradesRouter);

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

const port = process.env.PORT || 3000;
// Setup listener
app.listen(port, () => {
    console.log('listening on ' + port);
});