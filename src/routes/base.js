const authRouter = require('./auth');
const express = require('express');
const router = express.Router();

const Post = require('../db/models/post.js')
const User = require('../db/models/user.js')

//helpers
const { toLower, calcDate } = require('../utils/helper.js');
const currUser = require('../db/models/currUser');

router.get('/', async (req, res) => {
  
  const posts = await Post.find({}).sort({"_id": -1}).lean()
  const currUser = await currUser.find({}).lean

  for(let post of posts) {
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

    if(post.upvoteList.includes(currUser)){
      post.uvoteClass = 'upvote-2'
      post.dvoteClass = 'downvote'
    }
    else if(post.downvoteList.includes(currUser)){
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


  res.render('index', {
    title: "Home", 
    posts: posts,
    user: currUser,
    helpers: {toLower, calcDate}
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

router.get('/search', (req, res) => {
  res.render('index', {title: "Home"});
});

router.post('/currUser', (req, res) => {
  const receivedObject = req.body
  global.currUser = receivedObject.userID
  console.log(global.currUser)
  res.status(200).json({message: 'Object stored successfully'})
})

router.use(authRouter);

// router.use((req, res) => {
//   res.render("error", {
//       title: "Page not Found."
//   });
// });

module.exports = router;