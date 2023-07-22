const mongoose = require('mongoose')
const options = { useUnifiedTopology: true };

//import User, Comment, and Post from models
const User = require('./models/user.js')
const Post = require('./models/post.js')
const Comment = require('./models/comment.js')

const database = {
    //connect to database
    connect: function () {
        mongoose.connect(process.env.MONGODB_URI, options)
        .then(() => {
            console.log("Connected to MongoDB");
        })
        .catch((err) => {
            console.log(err);
        });
    },
    //inserts a single `doc` to the database based on the model `model`

    insertOne: function(model, doc, callback) {
        model.create(doc, function(error, result) {
            if(error) return callback(false);
            console.log('Added ' + result);
            return callback(true);
        });
    },

    //inserts multiple `docs` to the database based on the model `model`
    insertMany: function(model, docs) {
        model.insertMany(docs, function(error, result) {
            if(error) return callback(false);
            console.log('Added ' + result);
            return callback(true);
        });
    },

    /*
        searches for a single document based on the model `model`
        filtered through the object `query`
        limits the fields returned based on the string `projection`
        callback function is called after the execution of findOne() function
    */
    findOne: function(model, query, projection, callback) {
        model.findOne(query, projection, function(error, result) {
            if(error) return callback(false);
            return callback(result);
        });
    },

    /*
        searches for multiple documents based on the model `model`
        filtered through the object `query`
        limits the fields returned based on the string `projection`
        callback function is called after the execution of findMany() function
    */
    findMany: function(model, query, projection, callback) {
        model.find(query, projection, function(error, result) {
            if(error) return callback(false);
            return callback(result);
        });
    },

    /*
        updates the value defined in the object `update`
        on a single document based on the model `model`
        filtered by the object `filter`
    */
    updateOne: function(model, filter, update) {
        model.updateOne(filter, update, function(error, result) {
            if(error) return callback(false);
            console.log('Document modified: ' + result.nModified);
            return callback(true);
        });
    },

    /*
        updates the value defined in the object `update`
        on multiple documents based on the model `model`
        filtered using the object `filter`
    */
    updateMany: function(model, filter, update) {
        model.updateMany(filter, update, function(error, result) {
            if(error) return callback(false);
            console.log('Documents modified: ' + result.nModified);
            return callback(true);
        });
    },

    /*
        deletes a single document based on the model `model`
        filtered using the object `conditions`
    */
    deleteOne: function(model, conditions) {
        model.deleteOne(conditions, function (error, result) {
            if(error) return callback(false);
            console.log('Document deleted: ' + result.deletedCount);
            return callback(true);
        });
    },

    /*
        deletes multiple documents based on the model `model`
        filtered using the object `conditions`
    */
    deleteMany: function(model, conditions) {
        model.deleteMany(conditions, function (error, result) {
            if(error) return callback(false);
            console.log('Document deleted: ' + result.deletedCount);
            return callback(true);
        });
    },
    
    generateSampleData: async function() {
        try{
            const initialUsers = await User.create([
                {   username: 'Fishball_Lover39', 
                    userID: 1, 
                    profileImg: 'static/img/icon1.jpg',
                    fName: 'Miles',
                    lName: 'Morales',
                    bio: 'In the depths of my being, there flows an unyielding love for fish. Their graceful movements and vibrant colors captivate my soul, as if I am an ocean enchanted by their presence. With every breath I take, I embrace my identity as a devoted lover of these aquatic wonders, forever swimming in the depths of their beauty.',
                    email: 'fishballs@email.com',
                    password: '12345678'
                },
                {   username: 'Neonballs_6', 
                    userID: 2, 
                    profileImg: 'static/img/icon2.jpg',
                    fName: 'Fedor',
                    lName: 'Sebastian',
                    bio: '',
                    email: 'neonballs@email.com',
                    password: '12345678'
                },
                {   username: 'radioheadlover00', 
                    userID: 3, 
                    profileImg: 'static/img/icon3.jpg',
                    fName: 'Rian',
                    lName: 'Robert',
                    bio: '',
                    email: 'ilovearadiohead@email.com',
                    password: '12345678'
                },
                {   username: 'annoying_complainer', 
                    userID: 4, 
                    profileImg: 'static/img/icon4.jpg',
                    fName: 'Patric',
                    lName: 'Brontes',
                    bio: '',
                    email: 'thecomplainer@email.com',
                    password: '12345678'
                },
                {   username: 'xXdestroyerOfWorldsXx', 
                    userID: 5, 
                    profileImg: 'static/img/icon5.jpg',
                    fName: 'Rian',
                    lName: 'Robert',
                    bio: '',
                    email: 'destroyerofworlds@email.com',
                    password: '12345678'
                },      
            ])

            const initialPosts = await Post.create([

            ])

            const initialComments = await Comment.create([
                
            ])
        }
        catch(err){
            console.log(err)
        }
    }

}

//exports the object `database` (defined above)when another script exports from this file
module.exports = database;