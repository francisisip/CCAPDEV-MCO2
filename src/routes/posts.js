const express = require('express');
const router = express.Router();
const Post = require('../db/models/post.js')
const User = require('../db/models/user.js')
const Comment = require('../db/models/comment.js')

const { toLower, calcDate } = require('../utils/helper.js')

router.get('/', (req, res) => {
    res.send("In posts")
})

//post creation
router.post('/', async (req, res) => {
    try {
        const newPost = new Post(req.body)
        const post = await newPost.save();
        res.status(200).json(post)
    } catch(err) {
        res.status(500).json(err)
        return
    }
})

router.get('/:id', async (req, res) => {
    const resourceId = req.params.id;

    try {
        const foundPost = await Post.findOne({ postID: resourceId }).lean();
    
        if (!foundPost) {
          // Handle the case when the post is not found
          return res.status(404).send("Post not found");
        }

    let tag;
    switch(foundPost.tag) {
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
    foundPost.author = await User.findOne({userID: foundPost.userID}).select('username profileImg').lean();
    foundPost.tagClass = tag;

    const postComments = [];
    for (let comment of foundPost.comments) {
        postComments.push(await Comment.findOne({commentID: comment}).lean());
    }

    for (let user of postComments) {
        user.author = await User.findOne({userID: user.userID}).select('username userID profileImg').lean();
    }
    console.log(postComments);

    res.render('singlePost', { 
        title: foundPost.title, 
        post: foundPost,
        comments: postComments,
        helpers: {toLower, calcDate}
    });
    } catch (err) {
    // Handle any errors that occur during the database operations
    console.log("ERROR:", err);
    res.status(500).send("Internal Server Error");
  }
  });

  router.put('/:id/upvote', async(req, res) => {
    try {
      const post = await Post.findOne({postID: req.params.postID})
      console.log(post)
    } catch (err) {
      return res.status(500).json(err)
    }
  })

module.exports = router;