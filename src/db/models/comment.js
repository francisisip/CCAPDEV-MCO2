const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
    commentID: {
        type: String, //format: post(id*)_comment(num*)
        required: true,
        unique: true
    },
    desc: {
        type: String,
        required: true,

    },
    body: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        immutable: true,
        default: Date.now
    },
    postID: {
        type: Number,
        required: true
    },
    userID: {
        type: Number,
        required: true
    },
    parentComment: {
        type: String,
        default: ""
    },
    isEdited: {
        type: Boolean,
        default: false,
        required: true,
    },
    isDeleted:{
        type: Boolean,
        default: false,
        required: true,
    },
    //not sure how to store comments yet
    comments: [{
        type: String
    }]
})

module.exports = mongoose.model('Comment', commentSchema)