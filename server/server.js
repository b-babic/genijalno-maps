const express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    path = require('path'),
    passport = require('passport'),
    config = require('./config/config');

// Use node's default promise instead of Mongoose promise library
mongoose.Promise = global.Promise;

// connect to db 
mongoose.connect(config.db);
let db = mongoose.connection;

// on db open 
db.on('open', () => {
    console.log('%c Connected to the database! ', 'background: #222; color: #bada55');
});

// on db error 
db.on('error', (err) => {
    console.log('%c Connected to the database! ' + err, 'background: #222; color: #FA4659');
});

// initialize express
const app = express();

// set up public folder if needed
app.use(express.static('public'));
// set up body parse library 
app.use(bodyParser.json());
// passport middleware for dummy auth
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

// routes middleware 
app.use('/api/users', require('./routes/users'));

// default express error handling middleware 
app.use(function (err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }

    res.status(400).json({
        err: err
    });
});

// finally start the server 
const port = process.env.PORT || 3000;

app.listen(3000, () => {
    console.log('%c Listening on port ' + port, 'background: #222; color: #FA4659');
})
