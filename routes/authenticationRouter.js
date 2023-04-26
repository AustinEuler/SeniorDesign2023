var express =  require('express')
var router = express.Router();
const crypto = require("crypto") //Austin Code
const path = require('path')
/*const appObject = require('../appObjects')*/
/*const DAO = require(path.join(__dirname, '..', 'daoUtil'))*/


//Austin Code - Restricts user to only accessing the login page even if they manually input 'auth'
router.get('/',(req,res)=>{
    /*
    if(!req.session.isuser_valid) {
        req.session.isuser_valid = false
    }
     */
    //if user is already signed in, it will reroute to home
    console.log("User Authenticated? :" + req.session.isuser_valid)
    if(req.session.isuser_valid == true){
        res.redirect('../')
    }else{
        console.log("Redirected to login page")
       res.redirect('/auth/login')
    }

    //res.sendFile(path.join(__dirname,'..', 'public','login.html'))
})

router.get('/login',(req,res)=>{
    // res.sendFile(path.join(__dirname,'..', 'public','login.html'))
    res.render('pages/Login', {username: req.session.username})
})


router.post('/login',(req,res)=>{
    //TODO:this method has not been implemented
      let email = req.body.username
      let regPassword = req.body.passwd
      let checkPassword = crypto.createHash('md5').update(req.body.passwd).digest('hex');
        let  msg=""
        if(email=="abc@cau.edu" && regPassword=="123456"){
            msg="Success!"
            res.render('pages/msg', {message: 'Login was a success!', username:''})
        }else
            msg = "Failed"
            res.render('pages/msg', {message: 'Login was a failure!', username:''})
      //res.send({msg})
});

/*
//Austin Code - Checks the database to see if the user has a registered account.
// If user has an account then they will be sent to their profile page
// If user does not have account, they will be sent to the registration page
router.post('/login',(req,res)=>{
  //TODO:this method has not been implemented
    let email = req.body.username
    let regPassword = req.body.passwd
    let checkPassword = crypto.createHash('md5').update(req.body.passwd).digest('hex');

    if(email && checkPassword){

        DAO.userDAO.searchByEmail(email,(err,data)=>{
            if(err){
                res.render('pages/msg', {message:`Error 501: Login failed.`, username:''})
            }else if (data){

                //console.log("Database password: " + data.password)
                //console.log("Inputted password: " + checkPassword)
                //checks if password matches one from database
                if(data.password == checkPassword) {
                    req.session.isuser_valid = true //authorizes user to access website pages
                    console.log("User Authenticated? :" + req.session.isuser_valid)
                    req.session.username = data.name
                    console.log("Login successful! Redirected to profile page.")
                    //res.render('pages/profile', {username: data.name})
                    res.redirect('/u/profile')
                } else{
                    res.render('pages/msg', {message:`Error 402: Password does not match account.`, username:''})
                    console.log("Login failed! Redirected to error page.")
                }

            }else{
                res.render('pages/Registration', {username: req.session.username})
                console.log('Redirected to user registration page')

            }
        })
    }else{
        res.render('pages/msg', {message:'Error 401: Missing Username and/or password. Click back. ',username: ''})
    }
    //res.render('pages/msg', {message:'Sorry this function has not been implemented! ',username: ''})
})

//Austin Code - Routes to an admin page that shows all registered users, only if user is authenticated
// if user is not authenticated then user is redirected to error page
router.get("/allUsers",(req,res)=>{
    console.log("User Authenticated for all users? :" + req.session.isuser_valid)
    if(req.session.isuser_valid == true) {

        const done = (err, data) => {
            if (err) {
                res.send("Error!")
            } else {
                // res.json(data)
                let username = req.session.username
                res.render('pages/allUsers', {users: data, username: username})
            }
        }
        DAO.userDAO.selectAllUsers(done)
    }else{
        res.render('pages/msg', {message:`Error 403: Not Authorized to view material! Please Login.`, username:''})
        console.log("Redirected to error page.")
    }

})

*/

//Austin Code - creates logout functionality that sends user back to home screen.
router.get("/logout", (req,res)=>{
    req.session.isuser_valid = false
    req.session.username = undefined
    res.redirect('../')

})

router.get("/Registration", (req, res)=>{
    res.render('pages/Registration', {username: req.session.username})
})

/*
router.post("/Registration", (req, res)=>{
    let name = req.body.name
    let email = req.body.username
    let password = req.body.passwd
    if(name && email && password){
        DAO.userDAO.searchByEmail(email, (err,data)=>{
            //this is the call back function to check the result of email lookup
            if(err){
                res.render('pages/msg', {message:`Error 501: Registration failed.`, username:''})
            }else if (data){
                res.render('pages/msg', {message:`There is already account with your email : ${email}.`, username:''})
            }else{
                //Now we need to complete the registration process
                let name = req.body.name
                let email = req.body.username
                let password = req.body.passwd
                let user = new appObject.user(name, email, password)
                DAO.userDAO.addUser(user, (err, data)=>{
                    //This is the call back function for handling the outcome of the addUser function

                    if(err){
                        res.render('pages/msg', {message:`Error 502: Registration failed.`,username:''})
                    }else{
                        res.redirect('/Login')
                    }
                })
            }
        })

    }

})
*/


module.exports = router