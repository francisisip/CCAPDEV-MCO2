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
    let valid = 0

    await currUser.findOne({}).then(doc => {
        activeID = doc.get("userID", Number)
    })

    if(Number(activeID) === Number(req.params.userID)){
        console.log('in here')
        valid = 1
    }

    const userProfile = await User.findOne({ 
        userID: req.params.userID
    }).lean();

    const postsArray = await Post.find({
        userID: req.params.userID
    }).lean()

    const commentsArray = await Comment.find({
        userID: req.params.userID
    }).lean()

    for(let post of postsArray) {
        post.author = await User.findOne({userID: post.userID}).select('username profileImg').lean()
        post.commentsNo = post.comments.length

        let tag
        switch(post.tag) {
            case "Announcements":
                tag = "bi-megaphone-fill";
                break;
            case "Review":
                tag = "bi-check-circle-fill";
                break;
            case "Query":
                tag = "bi-question-circle-fill";
                break;
            case "Meme":
                tag = "bi-emoji-laughing-fill";
                break;
            case "Meta":
                tag = "bi-lightbulb-fill";
        }

        if(post.upvoteList.includes(activeID)){
            post.uvoteClass = 'upvote-2'
            post.dvoteClass = 'downvote'
        }
        else if(post.downvoteList.includes(activeID)){
            post.uvoteClass = 'upvote'
            post.dvoteClass = 'downvote-2'
        }
        else {
            post.uvoteClass = 'upvote'
            post.dvoteClass = 'downvote'
        }

        post.tagClass = tag
        post.voteCount = post.upvoteList.length - post.downvoteList.length
    }

    for(let comment of commentsArray) {
        comment.author = await User.findOne({userID: comment.userID}).select('username profileImg').lean()
    }

    if(userProfile){
        res.render("users", {
            user: activeID,
            match: valid,
            loadedProfile: userProfile,
            posts: postsArray,
            comments: commentsArray,
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