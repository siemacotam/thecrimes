var createError = require('http-errors');
var cookieSession = require('cookie-session');
const express = require('express'); //Line 1
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const Users = require('./models/user')

// laczenie z baza danych
var config = require('./config');
var mongoose = require('mongoose');
mongoose.connect(config.db, {useNewUrlParser: true, useUnifiedTopology: true})
var db = mongoose.connection;
mongoose.connection.on('open', function (ref) {
  console.log('Connected to mongo server.');
})
db.on('error', console.error.bind(console, 'conection error:'));

db.once('open', function(){
  console.log('db connected');

})



const app = express(); //Line 2
const port = process.env.PORT || 5000; //Line 3

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6

// create a GET route
app.get('/express_backend', (req, res) => { //Line 9
  res.send({ express: `YOUR EXPRESSssss BACKEND IS CONNECTED TO REACT $ `}); //Line 10
}); //Line 11

app.post('/create-new-hero', (req, res) => { //Line 9
  const {email, password,avatar,name} = req.body.newUser
  console.log(req.body)
  // dodawanie do db
    const newUser = new Users({
        email,
        password,
        avatar,
        name,
        energy: 100,
        respect: 1,
        cash: 1000,
    })

    newUser.save((err)=>{console.log(err)})

  res.send({newUser}); //Line 10
}); //Line 11

app.post('/new-hero', (req, res) => {
  const name = req.body.playerName
  console.log(name)

  // szukanie w bazie danych
  Users.find({ "name": name }, function (err, user) {
    if (err) return handleError(err);
    console.log(user.length, user, name)
    if(user.length > 0){res.send({info: true})}
    if(user.length === 0){res.send({info: false})}
  })
});

app.post('/register', (req, res) => {
  const email = req.body.email

  // szukanie w bazie danych
  Users.find({ 'email': email }, function (err, user) {
    if (err) return handleError(err);
    console.log(user.length)
    if(user.length > 0){res.send({info: true})}
    if(user.length === 0){res.send({info: false})}
  })
});

app.post('/login', (req, res) => {
  const {email, password} = req.body.userData

  // szukanie w bazie danych
  Users.find({ 'email': email, 'password': password }, function (err, user) {
    if (err) return handleError(err);

    console.log(user)

    if(user.length > 0){res.send({info: true, user})}
    if(user.length === 0){res.send({info: false})}
  })
});
