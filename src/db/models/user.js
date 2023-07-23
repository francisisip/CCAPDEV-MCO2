const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    userID: {
        type: Number,
        required: true,
        unique: true
    },
    profileImg: {
        type: String,
    },
    fName: {
        type: String,
    },
    lName: {
        type: String,
    },
    bio: {
        type: String,
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }

})

module.exports = mongoose.model('User', userSchema);
