const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId, ref: 'User',
        required: true,
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
    comments: [{
        type: Schema.Types.ObjectId, ref: 'Comment',
    }],
    isEdited: {
        type: Boolean,
        default: false,
        required: true,
    }

})

module.exports = mongoose.model('Post', postSchema)