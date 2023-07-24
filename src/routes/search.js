const express = require('express');
const router = express.Router();

const Post = require('../db/models/post');
const User = require('../db/models/user');
const currUser = require('../db/models/currUser.js');

//helpers
const { toLower, calcDate } = require('../utils/helper.js')

router.get('/search', async (req, res) => {

    try{
        let search = req.query.search || "";
        let sort = req.query.sort || "date"; 
        let tags = req.query.tag || "All"; // 

        let activeID

        await currUser.findOne({}).then(doc => {
            activeID = doc.get("userID", Number)
        })
        console.log(activeID)

        req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]); 

        let sortBy = {}
        if (sort[1]) {
            sortBy[sort[0]] = sort[1];
        } else {
            sortBy[sort[0]] = "desc"; // sort most recent default
        }

        let query = Post.find({
            $or: [
              { title: { $regex: search, $options: "i" } }, // Search for 'search' term in the title
              { body: { $regex: search, $options: "i" } }   // Search for 'search' term in the body
            ]
        });

        if (tags !== "All") {
            query = query.where("tag", new RegExp(tags, "i"));
        }

        const posts = await query.sort(sortBy).lean();
        //const users = await User.find().collation({ locale: 'en', strength: 2 }).sort({"username": 1}).lean()

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

        // console.log(users)

        res.render('search', {
            title: "Home", 
            posts: posts,
            user: activeID,
            helpers: {toLower, calcDate}
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