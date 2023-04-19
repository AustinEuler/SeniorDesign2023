var express =  require('express')
var router = express.Router();
const crypto = require("crypto") //Austin Code
const path = require('path')


router.get('/',(req,res)=>{
    /*
    if(!req.session.isuser_valid) {
        req.session.isuser_valid = false
    }
     */

    res.redirect('/survey/startSurvey')

    

    //res.sendFile(path.join(__dirname,'..', 'public','login.html'))
})



router.get('/startSurvey', (req,res)=> {
    req.session.counter = 0
    req.session.surveyStarted = false
    res.render('pages/surveyStart', {username:req.session.username})
})

router.get('/started',(req,res)=> {
    surveyStarted = req.session.surveyStarted
    counter = req.session.counter
    if(surveyStarted == false){
        req.session.surveyStarted = true
        
    }
    if(counter == 0){
        console.log("Starting survey...")
        req.session.counter += 1
        res.render('pages/Question1', {username: req.session.username})
    }
    else if (counter == 1){
        req.session.counter += 1
        res.render('pages/Question2', {username: req.session.username})
    }
    else if (counter == 2){
        req.session.counter += 1
        res.render('pages/Question3', {username: req.session.username})
    }
    else if (counter == 3){
        req.session.counter += 1
        res.render('pages/Question4', {username: req.session.username})
    }
    else if (counter == 4){
        req.session.counter += 1
        res.render('pages/Question5', {username: req.session.username})
    }
    else if (counter == 5){
        req.session.counter += 1
        res.render('pages/Question6', {username: req.session.username})
    }
    else if (counter == 6){
        req.session.counter += 1
        res.render('pages/Question7', {username: req.session.username})
    }
    else{
        req.session.surveyStarted = false
        req.session.surveyEnded = true
        res.render('pages/surveyEnd', {username: req.session.username})
    }

})










module.exports = router