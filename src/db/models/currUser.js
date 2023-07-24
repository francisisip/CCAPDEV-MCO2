const mongoose = require('mongoose')
const Schema = mongoose.Schema

const currSchema = new Schema({
    userID: {
        type: Number,
        default: 0
    },
    name: {
        type: String,
        default: 'session-user',
        immutable: true
    }
})

module.exports = mongoose.model('currUser', currSchema)