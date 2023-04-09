const express = require('express');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const http = require('http')
/*const PORT = process.env.PORT || 4000 
*/ 
const PORT = 6000;

const app = express()
const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname));
app.use(cookieParser());

//username and password
const myusername = 'user1'
const mypassword = 'mypassword'

var session;

app.get('/',(req,res) => {
    session=req.session;
    if(session.userid){
        res.send("Welcome User <a href=\'/logout'>click to logout</a>");
    }else
    res.sendFile('views/pages/tester.html',{root:__dirname})
});

app.post('/user',(req,res) => {
    if(req.body.username == myusername && req.body.password == mypassword){
        session=req.session;
        session.userid=req.body.username;
        console.log(req.session)
        res.send(`Hey there, welcome <a href=\'/logout'>click to logout</a>`);
    }
    else{
        res.send('Invalid username or password');
    }
})

app.get('/logout',(req,res) => {
    req.session.destroy();
    res.redirect('/');
});

app.listen(PORT, () => console.log(`Server Running at port ${PORT}`));
/*

const server = http.createServer((request,response) => {

    response.writeHead (200,{
        "context-type": "text/plain"
    })
    response.end("Welcome to HBCUMatch.com! This is a work in progress :)")
})

server.listen(PORT,() => {
    console.log("Server is ready and listening at port", PORT)
})
server.on('error',(error)=> {
    if(error.code === 'EADRINUSE')
    {
        console.log('Port already in use')
    }
})
*/
