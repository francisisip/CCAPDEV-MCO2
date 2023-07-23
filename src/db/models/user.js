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

async function checkCredentials(username, password) {
    try {
        const user = await User.findOne({ username });

        if (!user) {
            return false; // Username not found
        }

        if (user.password === password) {
            return true; // Passwords match
        } else {
            return false; // Passwords do not match
        }
    } catch (error) {
        console.error('Error while checking credentials:', error);
        return false;
    }
}

module.exports = mongoose.model('User', userSchema);
module.exports.checkCredentials = checkCredentials;
