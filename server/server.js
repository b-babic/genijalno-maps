const express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    path = require('path'),
    passport = require('passport'),
    config = require('./config/db');

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
// passport middleware for dummy auth
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
// passport config
require('./config/passport')(passport);

//bodyParser after routes initialization
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json({
    type: '*/*'
}));

// routes middleware 
app.use('/api/users', require('./routes/users'));
// finally start the server 
const port = process.env.PORT || 3000;

app.listen(3000, () => {
    console.log('%c Listening on port ' + port, 'background: #222; color: #FA4659');
})
