const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
  res.render('login', { layout: 'auth', title: "Home"});
});

router.get('/register', (req, res) => {
    res.render('register', { layout: 'auth', title: "Home"});
  });

module.exports = router;