const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
    body: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        immutable: true,
        default: Date.now
    },
    comments: [{
        type: Schema.Types.ObjectId, ref: 'Comment'
    }],
    parentPost: {
        type: Schema.Types.ObjectId, ref: 'Post',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId, ref: 'User',
        required: true
    }
})

module.exports = mongoose.model('Comment', commentSchema)