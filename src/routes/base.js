const authRouter = require('./auth');
const searchRouter = require('./search');
const express = require('express');
const router = express.Router();

const Post = require('../db/models/post.js')
const User = require('../db/models/user.js')
const currUser = require('../db/models/currUser.js');

//helpers
const { toLower, calcDate } = require('../utils/helper.js');

//initial display
const initialPosts = 15

router.get('/', async (req, res) => {
  const totalPosts = await Post.find({}).lean()
  const posts = await Post.find({isDeleted: false}).sort({"_id": -1}).lean();
  let activeID
  let i = 0
  let buttonShown

  console.log('current session Id =' + req.session.userID)
  if(req.session.userID) {
    activeID = req.session.userID
  } else {
    activeID = 0
  }

  if(posts.length <= initialPosts) {
    buttonShown = 'none'
  } else {
    buttonShown = 'flex'
  }


  for(let post of posts) {
    post.author = await User.findOne({userID: post.userID}).select('username profileImg').lean()
    post.commentsNo = post.comments.length
    post.displayNum = i
    i++

    if(post.displayNum < initialPosts) {
      post.shown = 'post-shown'
    } else {
      post.shown = 'post-hidden'
    }

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

  const userObject = await User.findOne({userID: activeID}).lean();

  res.render('index', {
    title: "Home", 
    posts: posts,
    totalPosts: totalPosts,
    user: activeID,
    initialShown: initialPosts,
    buttonShown: buttonShown,
    helpers: {toLower, calcDate},
    userObject: userObject
  });
});

router.get("/home", (req, res) => {
  res.redirect("/");
});

router.get("/homepage", (req, res) => {
  res.redirect("/");
});
  
router.post('/', (req, res) => {
  
});

router.use(authRouter);
router.use(searchRouter);

// router.use((req, res) => {
//   res.render("error", {
//       title: "Page not Found."
//   });
// });

module.exports = router;