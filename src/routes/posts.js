const express = require('express');
const router = express.Router();
const Post = require('../db/models/post.js')
const User = require('../db/models/user.js')
const Comment = require('../db/models/comment.js')
const currUser = require('../db/models/currUser.js');

async function countComments(comment) {
    let totalComments = comment.comments.length;
  
    for (const nestedCommentId of comment.comments) {
      const nestedComment = await Comment.findOne({ commentID: nestedCommentId });
      if (nestedComment && nestedComment.comments && nestedComment.comments.length > 0) {
        const recursiveTotal = await countComments(nestedComment);
        totalComments += recursiveTotal;
      }
    }
  
    return totalComments;
  }
  
  async function countTotalComments(post) {
    let totalComments = post.comments.length;
  
    for (const commentId of post.comments) {
      const comment = await Comment.findOne({ commentID: commentId });
      if (comment && comment.comments && comment.comments.length > 0) {
        const recursiveTotal = await countComments(comment);
        totalComments += recursiveTotal;
      }
    }
  
    return totalComments;
  }

const { toLower, calcDate } = require('../utils/helper.js')

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


router.get('/:id/:cID', async (req, res) => {
    const postID = req.params.id;
    const commentID = req.params.cID;

    let activeID

    await currUser.findOne({}).then(doc => {
        activeID = doc.get("userID", Number)
    })

    try {
        // Find the post with the given postID
        const foundPost = await Post.findOne({ postID: postID }).lean();

        if (!foundPost) {
            // Handle the case when the post is not found
            return res.status(404).send("Post not found");
        }

        // Find the comment with the given commentID within the foundPost
        const foundComment = await Comment.findOne({commentID: commentID}).lean()
        
        if (!foundComment) {
            // Handle the case when the comment is not found
            return res.status(404).send("Comment not found");
        }

        const postComments = [];
        for (let comment of  foundComment.comments) {
            postComments.push(await Comment.findOne({commentID: comment}).lean());
        }
        for (let user of postComments) {
            user.author = await User.findOne({userID: user.userID}).select('username userID profileImg').lean();
        }

        // Fetch additional information about the comment's author
        foundComment.author = await User.findOne({userID: foundComment.userID}).select('username userID profileImg').lean();

        if (activeID === foundComment.author.userID){
            foundComment.isUser = ""
        } else {
            foundComment.isUser = " hidden"
        }

        if (foundComment.isDeleted === true) {
            foundComment.isUser = " hidden"
            foundComment.isDeleted = " hidden"
        } else {
            foundComment.isDeleted = ""
        }

        if (foundComment.parentComment === "") {
            foundComment.goBack = foundComment.postID
        } else {
            foundComment.goBack = foundComment.postID + "/" + foundComment.parentComment
        }

        res.render('singleComment', {
            title: foundComment.author.username,
            post: foundPost,
            comment: foundComment,
            nestedComments: postComments,
            user: activeID,
            helpers: { toLower, calcDate }
        });
    } catch (err) {
        // Handle any errors that occur during the database operations
        console.log("ERROR:", err);
        res.status(500).send("Internal Server Error");
    }
});

router.get('/:id', async (req, res) => {
    const resourceId = req.params.id;

    let activeID

    await currUser.findOne({}).then(doc => {
        activeID = doc.get("userID", Number)
    })

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
    foundPost.author = await User.findOne({userID: foundPost.userID}).select('userID username profileImg').lean();
    foundPost.tagClass = tag;
    foundPost.voteCount = foundPost.upvoteList.length - foundPost.downvoteList.length
  
    if (activeID === foundPost.author.userID){
        foundPost.isUser = ""
    } else {
        foundPost.isUser = " hidden"
    }

    if (foundPost.isDeleted === true) {
        foundPost.isUser = " hidden"
        foundPost.isDeleted = " hidden"
    } else {
        foundPost.isDeleted = ""
    }

    const postComments = [];
    for (let comment of foundPost.comments) {
        postComments.push(await Comment.findOne({commentID: comment}).lean());
    }

    for (let user of postComments) {
        user.author = await User.findOne({userID: user.userID}).select('username userID profileImg').lean();
    }

    res.render('singlePost', { 
        title: foundPost.title, 
        post: foundPost,
        comments: postComments,
        user: activeID,
        helpers: {toLower, calcDate}
    });
    } catch (err) {
    // Handle any errors that occur during the database operations
    console.log("ERROR:", err);
    res.status(500).send("Internal Server Error");
  }
});

//UPVOTE
router.put('/:id/upvote', async(req, res) => {
    const resourceID = req.params.id
    const user = req.body.userID
    try {
        const post = await Post.findOne({postID: resourceID}).lean()
    

        //if not upvoted and currently downvoted
        if(!post.upvoteList.includes(user) && post.downvoteList.includes(user)) {
            await Post.findOneAndUpdate(
                { postID: resourceID },
                { $push: { upvoteList: user }, $pull: { downvoteList: user } }
            );

            return res.status(200).json("Post is upvoted!");
        }
        //if user has not voted on it
        else if(!post.upvoteList.includes(user) && !post.downvoteList.includes(user)) {
            console.log('in')
            await Post.findOneAndUpdate(
                { postID: resourceID },
                { $push: { upvoteList: user } }
            );
            return res.status(200).json("Post is upvoted!");
        }
        //if already upvoted
        else if(post.upvoteList.includes(user)) {
            await Post.findOneAndUpdate(
                { postID: resourceID },
                { $pull: { upvoteList: user } }
            );
            return res.status(200).json("Post is no longer upvoted!");
        }
        else console.log('no updates made')
    } catch (err) {
        return res.status(500).json(err)
    }
})

//DOWNVOTE
router.put('/:id/downvote', async(req, res) => {
    const resourceID = req.params.id
    const user = req.body.userID
    try {
        const post = await Post.findOne({postID: resourceID}).lean()
    

        //if not upvoted and currently downvoted
        if(!post.downvoteList.includes(user) && post.upvoteList.includes(user)) {
            await Post.findOneAndUpdate(
                { postID: resourceID },
                { $push: { downvoteList: user }, $pull: { upvoteList: user } }
            );

            return res.status(200).json("Post is downvoted!");
        }
        //if user has not voted on it
        else if(!post.upvoteList.includes(user) && !post.downvoteList.includes(user)) {
            console.log('in')
            await Post.findOneAndUpdate(
                { postID: resourceID },
                { $push: { downvoteList: user } }
            );
            return res.status(200).json("Post is downvoted!");
        }
        //if already upvoted
        else if(post.downvoteList.includes(user)) {
            await Post.findOneAndUpdate(
                { postID: resourceID },
                { $pull: { downvoteList: user } }
            );
            return res.status(200).json("Post is no longer downvoted!");
        }
        else console.log('no updates made')
    } catch (err) {
        return res.status(500).json(err)
    }
})


router.put('/:id/:cID', async (req, res) => {
    const commentID = req.params.cID;
    try {
        const comment = await Comment.findOne({commentID: commentID});
        
        comment.body = req.body.body;
   
        comment.isEdited = true; // Set isEdited to true, assuming this indicates the post has been edited
        
        
        await comment.save();

        return res.status(200).json({ message: 'Post updated successfully' });
    } catch (err) {
        return res.status(500).json({ message: 'Error updating post'})
    }
});

router.put('/:id', async (req, res) => {
    try {
        const post = await Post.findOne({postID: req.body.id});
        post.title = req.body.title;
        post.tag = req.body.tag;
        post.desc = req.body.desc;
        post.body = req.body.body;
        post.isEdited = true; // Set isEdited to true, assuming this indicates the post has been edited

        await post.save();

        return res.status(200).json({ message: 'Post updated successfully', post });
    } catch (err) {
        return res.status(500).json({ message: 'Error updating post'})
    }
});

router.delete('/:id', async(req, res) => {
    const postID = req.params.id;

    try {
        const post = await Post.findOne({postID: postID});

        post.desc = "This post has been deleted.";
        post.body = "This post has been deleted.";
        post.isDeleted = true;
        post.isEdited = false;

        await post.save();
        return res.status(200).json({ message: 'Post deleted successfully', post });
    } catch (err) {
        return res.status(500).json({ message: 'Error deleting post'})
    }
})

router.delete('/:id/:cID', async(req, res) => {
    const commentID = req.params.cID;
   
    try {
        const comment = await Comment.findOne({commentID: commentID});
        
        comment.body = "This post has been deleted.";
        comment.isDeleted = true;
        comment.isEdited = false;
        await comment.save();
        return res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (err) {
        return res.status(500).json({ message: 'Error deleting post'})
    }
})

router.post('/:id', async (req, res) => {
    const postId = req.params.id;
    const { userId, body } = req.body; // Extract userId and body from the request body

    try {
        const post = await Post.findOne({ postID: postId });
       
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        let addComments = await countTotalComments(post) + 1;
        console.log(addComments)
        const commentId = "post" + postId + "_" + addComments;
        console.log(commentId)
        // Create a new Comment instance using the Comment model
        const newComment = new Comment({
            commentID: commentId,
            body: body,
            postID: postId,
            userID: userId
        });
        console.log(newComment);
        // Save the new comment to the database
        await newComment.save();

        // Add the commentId to the post's comments array
        post.comments.push(commentId);

        // Save the updated post with the new commentId in the comments array
        await post.save();

        return res.status(200).json({ message: 'Comment added successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
});

router.post('/:id/:cID', async (req, res) => {
    const postId = req.params.id;
    const cID = req.params.cID;
    const { userId, body } = req.body;

    try {
        const post = await Post.findOne({ postID: postId });
       
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        let addComments = await countTotalComments(post) + 1;
        console.log(addComments)
        const commentId = "post" + postId + "_" + addComments;
        console.log(commentId)

        const foundComment = await Comment.findOne({commentID: cID});
        if (!foundComment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        // Create a new Comment instance using the Comment model
        const newComment = new Comment({
            commentID: commentId,
            body: body,
            postID: postId,
            userID: userId
        });
        console.log(newComment);
        // Save the new comment to the database
        await newComment.save();


        foundComment.comments.push(commentId);
        foundComment.save();

        return res.status(200).json({ message: 'Comment added successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;