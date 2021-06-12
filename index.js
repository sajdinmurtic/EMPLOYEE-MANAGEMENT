const express = require('express');
const path = require('path');
const logger = require('morgan');

const expressLayouts = require('express-ejs-layouts');
const app = express()

const index = require('./routes/index');
const employees = require('./routes/employees');

var app = express();


app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
app.set('layout', 'layout/main');


app.use(expressLayouts);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/employees', employees);

app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;