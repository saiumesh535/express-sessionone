var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const http  = require('http');
var index = require('./routes/index');
var users = require('./routes/users');
const expressjwt = require('express-jwt')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressjwt({
  secret: 'secretKey'
}).unless({
  path: ['/auth/login','/welcome']
}))

middleWare = function(req,res,next){
  console.log("I'm usesless middeleare");
  next();
}

// this is for connecting database 
const configs = require('./utils/config');
const mysql_singleton = require('mysql-singleton');
const config = {
  host: configs.mysqlConfig.host,
  user: configs.mysqlConfig.username,
  password: configs.mysqlConfig.password,
  database: configs.mysqlConfig.database
}
mysql_singleton.config(config)

//app.use(middleWare);

app.use('/', index);
app.use('/users', users);
app.use('/auth',require('./controllers/auth'));
app.get('/welcome', (req,res)=>{
  res.render('welcome',{});
})


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

const port = process.env.PORT || 3000;

http.createServer(app).listen(port,()=>{
  console.log(`express running ${port}`);
})

module.exports = app;
