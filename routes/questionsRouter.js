var express =  require('express')
var router = express.Router();
const crypto = require("crypto") //Austin Code
const path = require('path')
const DAORankings = require('../data/rankings.js')


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
    req.session.SurveyAnswers = {}
    req.session.counter = 0
    req.session.surveyStarted = false
    req.session.CompletedSurveyAsGuest = false
    res.render('pages/surveyStart', {username:req.session.username})
    console.log("User Location: Start Survey Screen")
})

router.post('/started',(req,res)=> {
    surveyStarted = req.session.surveyStarted
    /*
    if(req.body.Q1 == "Small"){
        req.session.answers[1]={"sv":Q1, "nv":1}

    }else if(){

    }
    */
    
    if(surveyStarted == false){
        req.session.surveyStarted = true
        surveyStarted = req.session.surveyStarted
    }
    

    // allows the user to go back to previous question
    if((req.body.button != undefined) ){
        prevButton = req.body.button
        response = req.body
        console.log(response)

        if(prevButton == 'prev'){
            req.session.counter -= 2
            console.log("User chose to go back to previous question")
        }else{
            console.log("User chose to advance to next question")
        }

        counter = req.session.counter

    }else{
        counter = req.session.counter
    }

    

    if(counter == 0){
        console.log("Starting survey...")
        req.session.counter += 1
        res.render('pages/Question1', {username: req.session.username})
        console.log("User Location: Question 1 of Survey")
    }
    else if (counter == 1){
        req.session.SurveyAnswers["Q1"]=req.body["Q1"]
        req.session.counter += 1
        res.render('pages/Question2', {username: req.session.username})
        console.log("User Location: Question 2 of Survey")
    }
    else if (counter == 2){
        req.session.SurveyAnswers["Q2"]=req.body["Q2"]
        req.session.counter += 1
        res.render('pages/Question3', {username: req.session.username})
        console.log("User Location: Question 3 of Survey")
    }
    else if (counter == 3){
        req.session.SurveyAnswers["Q3"]=req.body["Q3"]
        req.session.counter += 1
        res.render('pages/Question4', {username: req.session.username})
        console.log("User Location: Question 4 of Survey")
    }
    else if (counter == 4){
        req.session.SurveyAnswers["Q4"]=req.body["Q4"]
        req.session.counter += 1
        res.render('pages/Question5', {username: req.session.username})
        console.log("User Location: Question 5 of Survey")
    }
    else if (counter == 5){
        req.session.SurveyAnswers["Q5"]=req.body["Q5"]
        req.session.counter += 1
        res.render('pages/Question6', {username: req.session.username})
        console.log("User Location: Question 6 of Survey")
    }
    else if (counter == 6){
        req.session.SurveyAnswers["Q6"]=req.body["Q6"]
        req.session.counter += 1
        res.render('pages/Question7', {username: req.session.username})
        console.log("User Location: Question 7 of Survey")
    }
    else{
        req.session.SurveyAnswers["Q7"]=req.body["Q7"]
        req.session.surveyStarted = false

        if(req.session.username == "Guest"){
            req.session.CompletedSurveyAsGuest = true  
        }
        console.log("Ending Survey ... User Responses Shown Below - ")
        console.log(req.session.SurveyAnswers)
        console.log("Completed survey as a Guest: ", req.session.CompletedSurveyAsGuest)
        
        //DAORankings.processQuestionnaireAnswers(seq.session.SurveyAnswers)

        res.render('pages/surveyEnd', {username: req.session.username, 
            CompletedSurveyAsGuest: req.CompletedSurveyAsGuest})
    }


})










module.exports = router