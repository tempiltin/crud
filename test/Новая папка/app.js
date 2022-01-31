var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose')
const { engine } = require('express-handlebars')

var mainRouter = require('./routes/main');
var usersRouter = require('./routes/users');
const async = require('hbs/lib/async');
const console = require('console');

var app = express();

async function start() {
  try {
    await mongoose.connect('mongodb+srv://sardor:sardor7703@cluster0.hfzsm.mongodb.net/bookStore')
    const db = mongoose.connection
    db.on('error', console.error.bind(console, 'hato bor'))
    db.once('open' , function(){
      console.log('MongoDB bazasiga ulandi ulandi');
    })
  } catch (error) {

  }
}
start()



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.engine('handlebars', engine({
  defaultLayout: 'main',
  exname: 'hbs',
  runtimeOptions: {
    allowProtoMethodsByDefault: true,
    allowProtoPropertiesByDefault: true,
  }

}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', mainRouter);
app.use('/users', usersRouter);

/* catch 404 and forward to error handler*/
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
