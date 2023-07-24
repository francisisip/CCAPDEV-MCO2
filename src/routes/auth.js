function comparePasswords(plaintext, password){
  return plaintext === password;
}

const express = require('express');
const router = express.Router();
const User = require('../db/models/user.js');
const currUser = require('../db/models/currUser.js');

router.get('/login', (req, res) => {
  res.render('login', { layout: 'auth', title: "Home"});
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

        const isMatch = comparePasswords(req.body.password, user.password)
        if(!isMatch){
            res.status(400).json({message: "Incorrect password."});
            return;
        }

        //Respond with the user
        const testuser = await User.findOne({username: req.body.username})
        const newID = testuser.userID
        const sname = 'session-user'

        console.log(newID)
        try{
            await currUser.findOneAndUpdate({name: sname}, {userID: newID})
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
    console.log(req.body);
    try {

        const emailExist = await User.findOne({email: req.body.email});
        const usernameExist = await User.findOne({username: req.body.username});

        if (!usernameExist && !emailExist) {
            const newUser = new User({
                username: req.body.username,
                password: req.body.password,
                userID: req.body.num,
                email: req.body.email
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
                message = "Email already exists.";
            }
            res.status(400).json({message: message}); 
        }
        
    }catch(err){
        res.status(500).json(err);
        return;
    }
});

router.put("/setActiveUser", async (req, res) => {
    const user = await User.findOne({username: req.body.username})
    const newID = user.userID
    const sname = 'session-user'

    console.log(newID)
    try{
        await currUser.findOneAndUpdate({name: sname}, {userID: newID})
        res.status(200)
        return
    }
    catch(err) {
        res.status(500).json(err);
        return
    }
})

module.exports = router;
