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
    body: {
        type: String,
        required: true,
    },
    voteCount: {
        type: Number,
        default: 0,
        required: true,
    },
    isEdited: {
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