const express = require('express');
const router = express.Router();
const currUser = require('../db/models/currUser.js');

router.use(async (req, res) => {
    await currUser.findOne({}).then(doc => {
        activeID = doc.get("userID", Number)
      })

    res.status(404).render('error', { 
        layout: 'main', 
        title: "Error", 
        user: activeID, 
    });
});

module.exports = router;