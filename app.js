
const express = require("express");
const session = require("express-session");
const app = express();
const { randomUUID } = require('crypto');
url = require('url')

const PORT = 40000 

/*Im the real dirty dan*/

app.use('/public', express.static('public'))
app.use(express.urlencoded({extended: true}))

app.use(session(  {
    genid: function(req) {
        return randomUUID() // use UUIDs for session IDs
    },
    secret: 'NALSKDndas0fjh123WSADc',
    saveUninitialized:false,
    resave:true}))


    app.set("view engine", "ejs")

var authentication_router= require('./routes/authenticationRouter')
var userRouter = require('./routes/userRouter')
var questionsRouter = require('./routes/questionsRouter')

app.use('/auth', authentication_router)
app.use('/u', userRouter)
app.use('/survey',questionsRouter)



app.get("/", function(req, res){
    res.render('pages/Home', {username: req.session.username});
    });

app.get("/login", function(req,res){
    res.render('pages/Login', {username: req.session.username});
})
app.get("/registration", function(req,res){
    res.render('pages/Registration');
})
app.get("/about", function(req,res){
    res.render('pages/About', {username: req.session.username});
})

/*
app.get("/Question1", function(req,res){
    req.session.counter = 0
    req.session.surveyStarted = true
    res.render('pages/surveyStart',{username: req.session.username, counter: req.session.counter})
})
*/

//Austin Code - Redirects to error page if user inputs the wrong URL
app.get('*',(req,res)=>{
    if(!req.session.isuser_valid) {
        req.session.isuser_valid = false
        req.session.username = "Guest"
    }
    console.log("User Authenticated? : ",req.session.isuser_valid)
    console.log("Username : ", req.session.username)
    let pathway = url.parse(req.url).pathname;
    //console.log(pathway)
    if(pathway != '/'){
        res.render('pages/msg', {message:'Error 404: Unable to retrieve page. Check url.', username:''})
    }
    else{
        res.render('pages/Home',  {username: req.session.username, valid: req.session.isuser_valid})
    }
})

app.listen(PORT, function(){
  console.log("Application started and listening on port" , PORT)});