require('dotenv').config()

const express = require('express')
const session = require('express-session')
const passport = require('passport')
const flash = require('connect-flash')
const bodyParser = require('body-parser')
var request = require('request');
const pool = require('./config/database.js')

const app = express()

var url = require('url');
var cors = require('cors');
const { Console } = require("console");
const { SSL_OP_TLS_D5_BUG } = require("constants");

//-----------for file upload---------------

var formidable = require("formidable");
var fs = require("fs");



app.use(express.static(__dirname + '/uploads'));

//--------------------------

const PORT = process.env.PORT || 80

//const routes = require('./routes/index')

app.use(express.static(__dirname + '/views'));


app.use(cors());


app.set('view engine', 'ejs')
app.use(session({
    secret: 'thatsecretthinggoeshere',
    resave: false,
    saveUninitialized: true
}));
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

app.use(function(req, res, next){
    res.locals.message = req.flash('message');
    next();
});

//app.use('/', routes)
require('./config/passport')(passport)

app.listen(PORT, () => {
    console.log(`Application server started on port: ${PORT}`)
})


var options_nfo_multi = { method: 'GET',
  url: 'https://api.datakick.in/NFO/quote?API_Key=2e7a9f5610fd0d&m=NIFTY21JULFUT/ADANIENT21JULFUT/BHEL21JULFUT/NIFTY21JUL13550CE',
  headers:  { 'User-Agent': 'Awesome-Octocat-App', 'Content-Type': 'application/json' } };

var options_nfo_single = { method: 'GET',
url: 'https://api.datakick.in/NFO/quote?API_Key=2e7a9f5610fd0d&m=NIFTY21JULFUT',
headers:  { 'User-Agent': 'Awesome-Octocat-App', 'Content-Type': 'application/json' } };


//---------------------------------------------
var options_nse_multi = { method: 'GET',
  url: 'https://api.datakick.in/NSE/quote?API_Key=2e7a9f5610fd0d&m=WELINV/XPROINDIA-BE/XCHANGING',
  headers:  { 'User-Agent': 'Awesome-Octocat-App', 'Content-Type': 'application/json' } };

var options_nse_single = { method: 'GET',
url: 'https://api.datakick.in/NSE/quote?API_Key=2e7a9f5610fd0d&m=XCHANGING',
headers:  { 'User-Agent': 'Awesome-Octocat-App', 'Content-Type': 'application/json' } };


var nfo_multi, nfo_single, nse_multi, nse_single;

request(options_nfo_multi, function (error, response, body) {
    console.log(error);
    console.log(response.statusCode );
  if (!error && response.statusCode == 200) 
    nfo_multi = body;
    console.log(nfo_multi);
});

request(options_nfo_single, function (error, response, body) {
  console.log(error);
  console.log(response.statusCode );
if (!error && response.statusCode == 200) 
  nfo_single = body;
  console.log(nfo_single);
});


//---------------------------

request(options_nse_multi, function (error, response, body) {
  console.log(error);
  console.log(response.statusCode );
if (!error && response.statusCode == 200) 
  nse_multi = body;
  console.log(nfo_multi);
});

request(options_nse_single, function (error, response, body) {
console.log(error);
console.log(response.statusCode );
if (!error && response.statusCode == 200) 
nse_single = body;
console.log(nfo_single);
});


//----------------------------------------------------


//Remove this while adding it in the main webApp
app.get('/', (req, res) => {
  res.redirect('/nfo_multi_page')
})

app.get('/nfo_multi_page', (req, res) => {
  res.render('nfo_multi_page.ejs')
})

app.get('/nfo_single_page', (req, res) => {
  res.render('nfo_single_page.ejs')
})

app.get('/nse_multi_page', (req, res) => {
  res.render('nse_multi_page.ejs')
})

app.get('/nse_single_page', (req, res) => {
  res.render('nse_single_page.ejs')
})


//-------------------------------------------------

  
app.get('/nfo_multi', (req, res) => {
  res.send(nfo_multi)
})

app.get('/nfo_single', (req, res) => {
  res.send(nfo_single)
})


app.get('/nse_multi', (req, res) => {
  res.send(nse_multi)
})

app.get('/nse_single', (req, res) => {
  res.send(nse_single)
})




//------------------------------------------------
