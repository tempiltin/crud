const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const exhbs = require('express-handlebars')
const indexRouter = require('./routes/index');
// const adminRouter = require('./routes/admin');
const app = express();
const mongoose = require('mongoose');


// config file
require('dotenv').config({ path: './.env' })

// view engine setup
const hbs = exhbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
  runtimeOptions: {
    allowProtoMethodsByDefault: true,
    allowProtoPropertiesByDefault: true
  }
})
app.engine('hbs', hbs.engine)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// require('./helper/db')()


async function start(){
  try {
    await mongoose.connect('mongodb+srv://shukurov:1234qwer123@cluster0.wzpci.mongodb.net/bookStore') 
    
    const db = mongoose.connection
    db.on('error' , console.error.bind(console , 'Error'))
    db.once('open' , function () {
      console.log('Malumotlar bazasi muvofaqiyatli ulangan');

    })

  } catch (error) {
    
  }
}
start()


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// app.use('/admin', adminRouter);

// catch 404 and forward to error handler
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
