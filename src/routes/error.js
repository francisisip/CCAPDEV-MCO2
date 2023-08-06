const express = require('express');
const router = express.Router();
const currUser = require('../db/models/currUser.js');
const User = require('../db/models/user.js')

router.use(async (req, res) => {
    await currUser.findOne({}).then(doc => {
        activeID = doc.get("userID", Number)
      })

    const userObject = await User.findOne({userID: activeID}).lean();

    res.status(404).render('error', { 
        layout: 'main', 
        title: "Error", 
        user: activeID,
        userObject: userObject, 
    });
});

module.exports = router;