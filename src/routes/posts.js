const express = require('express');
const router = express.Router();
const Post = require('../db/models/post.js')

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

module.exports = router;