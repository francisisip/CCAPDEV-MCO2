const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
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

userSchema.pre('save', async function (next) {
    const user = this;
    
    if (!user.isModified('password')) return next();
  
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(user.password, salt);
  
      user.password = hash;
      next();
    } catch (error) {
      next(error);
    }
});

userSchema.method('comparePasswords', function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
});

module.exports = mongoose.model('User', userSchema);
