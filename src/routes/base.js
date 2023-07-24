const authRouter = require('./auth');
const searchRouter = require('./search');
const express = require('express');
const router = express.Router();

const Post = require('../db/models/post.js')
const User = require('../db/models/user.js')
const currUser = require('../db/models/currUser.js');

//helpers
const { toLower, calcDate } = require('../utils/helper.js');

router.get('/', async (req, res) => {
  
  const posts = await Post.find({}).sort({"_id": -1}).lean();
  let activeID

  await currUser.findOne({}).then(doc => {
    activeID = doc.get("userID", Number)
  })
  console.log(activeID)

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

  res.render('index', {
    title: "Home", 
    posts: posts,
    user: activeID,
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

router.use(authRouter);
router.use(searchRouter);

// router.use((req, res) => {
//   res.render("error", {
//       title: "Page not Found."
//   });
// });

module.exports = router;