const express = require('express');
const router = express.Router();
const Post = require('../db/models/post.js')
const User = require('../db/models/user.js')
const Comment = require('../db/models/comment.js')
const currUser = require('../db/models/currUser.js')

//helpers
const { toLower, calcDate } = require('../utils/helper.js');

router.get('/', (req, res) => {
    res.send("In users");
})

router.get("/:userID", async (req, res)=>{ 

    let activeID

    await currUser.findOne({}).then(doc => {
        activeID = doc.get("userID", Number)
    })


    const userProfile = await User.findOne({ 
        userID: req.params.userID
    }).lean();

    const postsArray = await Post.find({
        userID: req.params.userID
    })

    const commentsArray = await Comment.find({
        userID: req.params.userID
    })

    console.log(userProfile)
    if(userProfile){
        res.render("users", {
            user: activeID,
            loadedProfile: userProfile,
            posts: postsArray,
            helpers: {toLower, calcDate}
        });
    }
    else{
        res.render("error", {
            title: "Page not Found."
        });
    }

 });

module.exports = router;