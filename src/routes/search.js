const express = require('express');
const router = express.Router();

const Post = require('../db/models/post');
const User = require('../db/models/user');
const currUser = require('../db/models/currUser.js');

//helpers
const { toLower, calcDate } = require('../utils/helper.js')

const initialPosts = 15;

router.get('/search', async (req, res) => {

    try{
        let search = req.query.search || "";
        let sort = req.query.sort || "date"; 
        let tags = req.query.tag || "All"; // 

        let activeID
        let buttonShown
        let i = 0

        if(req.session.userID) {
          activeID = req.session.userID
        } else {
          activeID = 0
        }

        console.log(activeID)

        req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]); 

        let sortBy = {}
        if (sort[1]) {
            sortBy[sort[0]] = sort[1];
        } else {
            sortBy[sort[0]] = "desc"; // sort most recent default
        }

        let totalPosts = Post.find({
            $or: [
              { title: { $regex: search, $options: "i" } }, // Search for 'search' term in the title
              { body: { $regex: search, $options: "i" } }   // Search for 'search' term in the body
            ]
        }).sort(sortBy).lean();

        if (tags !== "All") {
          totalPosts = totalPosts.where("tag", new RegExp(tags, "i")).sort(sortBy).lean();
        }

        //const totalPosts = await query.sort(sortBy).lean();
        const posts = await totalPosts.find({isDeleted: false}).lean();
        //const users = await User.find().collation({ locale: 'en', strength: 2 }).sort({"username": 1}).lean()

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

        if(posts.length <= initialPosts) {
          buttonShown = 'none'
        } else {
          buttonShown = 'flex'
        }

        if (req.query.sort === "upvoteList") {
          posts.sort((a, b) => b.voteCount - a.voteCount);
          console.log("highest");
        } else if (req.query.sort === "downvoteList") {
          posts.sort((a, b) => a.voteCount - b.voteCount);
          console.log("lowest");
        }

        res.render('search', {
          title: "Search", 
          posts: posts,
          totalPosts: totalPosts,
          user: activeID,
          initialShown: initialPosts,
          buttonShown: buttonShown,
          helpers: {toLower, calcDate},
          userObject: userObject
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({error: true, message: "Internal Server Error"});
    }
});

router.get("/home", (req, res) => {
  res.redirect("/");
});

router.get("/homepage", (req, res) => {
  res.redirect("/");
});
  
router.post('/', (req, res) => {
  
});

// router.use((req, res) => {
//   res.render("error", {
//       title: "Page not Found."
//   });
// });

module.exports = router;