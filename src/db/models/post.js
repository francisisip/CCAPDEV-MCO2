const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
    postID: {
        type: Number,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    userID: {
        type: Number,
        required: true
    },
    tag: {
        type: String,
        enum: ['Meta', 'Review', 'Query', 'Meme', 'Announcements'],
        required: true,
    },
    date: {
        type: Date,
        immutable: true,
        default: Date.now,
    },
    desc: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    upvoteList: [{
        type: Number
    }],
    downvoteList: [{
        type: Number
    }],
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
    }],

})

module.exports = mongoose.model('Post', postSchema)