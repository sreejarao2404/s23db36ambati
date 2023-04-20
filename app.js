var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('dotenv').config();
const connectionString =process.env.MONGO_CON
var mongoose = require('mongoose');
mongoose.connect(connectionString,{useNewUrlParser: true,useUnifiedTopology: true});
var flowers = require("./models/flowers");


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var flowersRouter = require('./routes/flowers');
var boardRouter = require('./routes/board');
var selectorRouter = require('./routes/selector');
var resourceRouter = require('./routes/resource');

//var flowers = require('./routes/flowers');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/flowers', flowersRouter);
app.use('/board', boardRouter);
app.use('/selector', selectorRouter);
app.use('/resource',resourceRouter);

//Get the default connection
var db = mongoose.connection;
//Bind connection to error event
db.on('error', console.error.bind(console, 'MongoDB connectionerror:'));
db.once("open", function(){
console.log("Connection to DB succeeded")});


// We can seed the collection if needed on server start
async function recreateDB(){
  // Delete everything
  await flowers.deleteMany();
  let instance1 = new flowers({flower_name:"rose",flower_color:"red",flower_size:"3 cm"});
  instance1.save().then((res)=>{
     console.log(res)
     console.log("First object saved")}
  ).catch(err=>{
     console.error(err)
  });
  let instance2 = new flowers({flower_name:"lotus",flower_color:"white",flower_size:"10 cm"});
  instance2.save().then((res)=>{
     console.log(res)
     console.log("second object saved")}
  ).catch(err=>{
     console.error(err)
  });
  let instance3 = new flowers({flower_name:"sunflowers",flower_color:"white",flower_size:"9 cm"});
  instance3.save().then((res)=>{
     console.log(res)
     console.log("third object saved")
   }).catch(err=>{
     console.error(err)
  });
  

 }
 let reseed = true;
 if (reseed) {recreateDB();}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;