function comparePasswords(plaintext, password){
  return plaintext === password;
}

const express = require('express');
const router = express.Router();
const User = require('../db/models/user');

router.get('/login', (req, res) => {
  res.render('login', { layout: 'auth', title: "Home"});
});

router.get('/register', (req, res) => {
    res.render('register', { layout: 'auth', title: "Home"});
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
        res.status(200).json({username: user.username, userID: user.userID});
    }catch(err){
        res.status(500).json(err);
        return;
    }
});

router.post('/register', async (req,res)=>{
  try{
      const emailExist = await User.findOne({email: req.body.email});
      const usernameExist = await User.findOne({username: req.body.username});

      if(!usernameExist){
      
          //Temporarily store the user data
          const userData = {
              username: req.body.username,
              email: req.body.email,
              password: req.body.password
          }
          //Create a new user
          const newUser = new User(userData);

          //Save the user and respond
          const user = await newUser.save();        
          res.status(200).json({message: "User created"});
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
      console.log("ERROR-IN-AUTH");
      console.log(err);
      res.status(500).json({ error: "Internal  Error" });
      return;
  }
});


module.exports = router;