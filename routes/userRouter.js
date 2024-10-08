var express =  require('express')
var router = express.Router();
const crypto = require("crypto") //Austin Code
const path = require('path')
const DAO = require('../data/rankings.js')


//Austin Code - Restricts user to only accessing the login page even if they manually input 'u'
router.get('/',(req,res)=>{
    /*
    if(!req.session.isuser_valid) {
        req.session.isuser_valid = false
    }
     */
    //if user is already signed in, it will reroute to home
    console.log("User Authenticated? :" + req.session.isuser_valid)
    if(req.session.isuser_valid == true){
        res.redirect('/u/profile')
    }else{
        console.log('User not authenticated - Redirected to login page')
        res.redirect('/auth/login')
    }

    //res.sendFile(path.join(__dirname,'..', 'public','login.html'))
})

router.get('/profile', (req,res) =>{

    res.render('pages/Profile', {username: req.session.username})
    console.log('User Location: Profile Page')

})

router.get('/profile/preferences', (req,res) => {
    res.render('pages/Preferences',{username: req.session.username, answers: req.session.SurveyAnswers})
    console.log('User Location: Profile Page - Preferences')

})


router.get('/profile/results', (req,res) => {
    //DAO.testme();
    DAO.processQuestionnaireAnswers(req.session.SurveyAnswers)
    res.render('pages/Results',{username: req.session.username, answers: req.session.SurveyAnswers})
    console.log('User Location: Profile Page - Results')

})

router.get('/allUsers', (req,res) => {
    res.send("all users page")
    console.log('User Location: All Users Page - Admin')
})

router.get('/allSchools', (req,res) => {
    res.send("all schools page")
    console.log('User Location: All Schools Page - Admin')
})





module.exports = router