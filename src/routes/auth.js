const express = require('express');
const router = express.Router();
const User = require('../db/models/user.js');
const currUser = require('../db/models/currUser.js');

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

router.get('/login', (req, res) => {
    console.log(req.session.userID)
    if(req.session.userID) { 
        res.redirect('/')
    } else {
        res.render('login', { layout: 'auth', title: "Home"});
    }
});

router.get('/register', async (req, res) => {
    const users = await User.find({}).sort({"_id": -1}).lean()
    res.render('register', { layout: 'auth', title: "Home", users: users});
});

router.post('/login', async (req,res)=>{
    try{
        const user = await User.findOne({username: req.body.username});
        if(!user){
            res.status(400).json({message: "User not found."});
            return;
        }

        const isMatch = await user.comparePasswords(req.body.password)
        if(!isMatch){
            res.status(400).json({message: "Incorrect password."});
            return;
        }

        //Respond with the user
        const testuser = await User.findOne({username: req.body.username})
        const newID = testuser.userID

        //console.log(newID)
        try{
            if(req.body.checked) {
                console.log('remember on')
            }
            else {
                console.log('remember off')
            }
            //if remember me is on
            if(req.body.checked) {
                const now = new Date()
                const expiration = new Date(now.getTime() + 1000 * 60 * 60 * 24 * 21)
                req.session.cookie.expires = expiration
            }else {
            }

            req.session.userID = newID
            req.session.save()
            res.status(200).json({username: user.username, userID: user.userID});
            return
        }
        catch(err) {
            res.status(500).json(err);
            return
        }
    }catch(err){
        res.status(500).json(err);
        return;
    }
});

router.post("/register", async (req, res) => {
    console.log("POST request received for /register");
    try {

        const validEmail = validateEmail(req.body.email);
        const emailExist = await User.findOne({email: req.body.email});
        const usernameExist = await User.findOne({username: req.body.username});

        if (!usernameExist && !emailExist && validEmail) {
            const newUser = new User({
                username: req.body.username,
                password: req.body.password,
                userID: req.body.num,
                email: req.body.email, 
                profileImg: "/static/img/icon0.jpg"
              });
          
              // Save the new user to the database
            const result = await newUser.save();
            const user = await User.findOne({username: req.body.username});
            res.status(200).json({username: user.username, userID: user.userID});
        }
        else{
            let message = "";
            if(usernameExist){
                message = "Username already exist.";
            }
            else if(emailExist){
                message = "Email address already exists.";
            }
            else if (!validEmail){
                message = "Email address is not valid."
            }
            res.status(400).json({message: message}); 
        }
        
    }catch(err){
        res.status(500).json(err);
        return;
    }
});

router.post('/logout', (req, res) => {
    console.log("POST request received for /logout");
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
        res.status(500).send('Server error');
        return;
      }
  
      // Session successfully destroyed
      res.status(200).send('Logout successful');
    });
});

module.exports = router;
