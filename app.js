var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const expressSession = require("express-session");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const passport = require('passport');
var app = express();
//view engine setup
app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

//passport code
app.use(expressSession({

    resave:false,
    saveUninitialized:false,
    secret:'sarahah sarahah'
    }));
    
    app.use(passport.initialize());
    app.use(passport.session());
    passport.serializeUser(usersRouter.serializeUser());
    passport.deserializeUser(usersRouter.deserializeUser());
    


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


module.exports = app;

