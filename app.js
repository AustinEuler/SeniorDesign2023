
const express = require("express");
const session = require("express-session");
const app = express();
const mysql = require("mysql");
const { randomUUID } = require('crypto');
const url = require('url')

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "HBCUmatch",
    port: "33061"
  });

const PORT = 4000 

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




app.get("/clark-atlanta", (req, res) => {
    const sql = "SELECT * FROM schools_info WHERE name = 'Clark Atlanta University'";
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.render("pages/clark-atlanta", { username:req.session.username, school: result[0] });
    });
  });

  app.get("/morehouse", (req, res) => {
    var display = {}
    /*
    let sql = "SELECT * FROM school_answers WHERE school = 'Morehouse'";
    db.query(sql, (err, result) => {
        if (err) throw err;
        display[school] = result[0]
        //res.render("pages/morehouse", { username:req.session.username, school: result[0] });
      });
    */
    const sql1 = "SELECT * FROM schools_info WHERE name = 'Morehouse College'";
    db.query(sql1, (err, result) => {
        if (err) throw err;
        //display[schoolA] = result[0]
        res.render("pages/morehouse", { username:req.session.username, school: result[0] });
      });

      //res.render("pages/morehouse", { username:req.session.username, school: display[school], schoolA: display[schoolA] });
  });

  app.get("/spelman", (req, res) => {
    const sql = "SELECT * FROM schools_info WHERE name = 'spelman'";
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.render("pages/spelman", { username:req.session.username, school: result[0] });
    });
  });

  app.get("/morris-brown", (req, res) => {
    const sql = "SELECT * FROM schools_info WHERE name = 'Morris Brown College'";
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.render("pages/morris-brown", { username:req.session.username, school: result[0] });
    });
  });



/*
app.get("/Question1", function(req,res){
    req.session.counter = 0
    req.session.surveyStarted = true
    res.render('pages/surveyStart',{username: req.session.username, counter: req.session.counter})
})
*/

//Austin Code - Redirects to error page if user inputs the wrong URL
app.get('*',(req,res)=>{
    if(req.session.isuser_valid == undefined) {
        req.session.isuser_valid = false
        req.session.username = "Guest"
        req.session.CompletedSurveyAsGuest = false

    }
    //console.log("-----------------------")
    //console.log("User Authenticated? : ",req.session.isuser_valid)
    //console.log("Username : ", req.session.username)
    //console.log("Completed survey as a Guest: ", req.session.CompletedSurveyAsGuest)
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