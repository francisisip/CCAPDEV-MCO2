const mongoose = require('mongoose')
const options = { useUnifiedTopology: true };

//import User, Comment, and Post from models
const User = require('./models/user.js')
const Post = require('./models/post.js')
const Comment = require('./models/comment.js')
const currUser = require('./models/currUser.js')

const database = {
    //connect to database
    connect: function () {
        mongoose.connect(process.env.PORT, options)
        .then(() => {
            console.log("Connected to MongoDB");
        })
        .catch((err) => {
            console.log(err);
        });
    },


    generateSampleData: async function() {
         if(await User.countDocuments() === 0) {
            console.log("populating users")
            try{
                const initialUsers = await User.create([
                    {   username: 'Fishball_Lover39', 
                        userID: 1, 
                        profileImg: '/static/img/icon1.jpg',
                        fName: 'Miles',
                        lName: 'Morales',
                        bio: 'In the depths of my being, there flows an unyielding love for fish. Their graceful movements and vibrant colors captivate my soul, as if I am an ocean enchanted by their presence. With every breath I take, I embrace my identity as a devoted lover of these aquatic wonders, forever swimming in the depths of their beauty.',
                        email: 'fishballs@email.com',
                        password: '12345678'
                    },
                    {   username: 'Neonballs_6', 
                        userID: 2, 
                        profileImg: '/static/img/icon2.jpg',
                        fName: 'Fedor',
                        lName: 'Sebastian',
                        bio: '',
                        email: 'neonballs@email.com',
                        password: '12345678'
                    },
                    {   username: 'radioheadlover00', 
                        userID: 3, 
                        profileImg: '/static/img/icon3.jpg',
                        fName: 'Rian',
                        lName: 'Robert',
                        bio: '',
                        email: 'ilovearadiohead@email.com',
                        password: '12345678'
                    },
                    {   username: 'mrbrightside', 
                        userID: 4, 
                        profileImg: '/static/img/icon4.jpg',
                        fName: 'Patric',
                        lName: 'Brontes',
                        bio: '',
                        email: 'mrbrightside@email.com',
                        password: '12345678'
                    },
                    {   username: 'xXdestroyerOfWorldsXx', 
                        userID: 5, 
                        profileImg: '/static/img/icon5.jpg',
                        fName: 'Rian',
                        lName: 'Robert',
                        bio: '',
                        email: 'destroyerofworlds@email.com',
                        password: '12345678'
                    },      
                ])
            }
            catch(err){
                console.log(err)
            }
         }
        
        if(await Post.countDocuments() === 0) {
            try {
                console.log("populating posts")
                const initialPosts = await Post.create([
                    {
                        postID: 1,
                        title: 'Tag your posts!',
                        userID: 2,
                        tag: 'Announcements',
                        date: new Date('2023-3-25'),
                        desc: "What's up, Omsiloggers! This is a friendly reminder to label your posts with the appropriate tag, as doable in the 'create post' interface. Posts without tags or are labeled with the wrong tag will be subject to removal.",
                        body: "What's up, Omsiloggers! This is a friendly reminder to label your posts with the appropriate tag, as doable in the 'create post' interface. Posts without tags or are labeled with the wrong tag will be subject to removal.",
                        upvoteList: [1, 2, 3, 4],
                        comments: []
                    },
                    {
                        postID: 2,
                        title: 'What type of bean comes after 4',
                        userID: 5,
                        tag: 'Meme',
                        date: new Date('2023-2-25'),
                        desc: "Edi Lima. haha",
                        body: "Edi Lima. haha",
                        upvoteList: [5, 1, 2, 3],
                        downvoteList: [4],
                        comments: ['post2_1', 'post2_2']
                    },
                    {
                        postID: 3,
                        title: "Ate Letty's Mango Blast Review",
                        userID: 3,
                        tag: 'Review',
                        date: new Date('2022-10-25'),
                        desc: "If you're looking to beat the heat, Ate Letty's Mango Blast is the best!! It's right around BGC, and has the best Mango Graham Shakes topped with caramel sauce and whipped cream, and the best part: they're buy1take1 for 150 pesos! Solid!",
                        body: "If you're looking to beat the heat, Ate Letty's Mango Blast is the best!! It's right around BGC, and has the best Mango Graham Shakes topped with caramel sauce and whipped cream, and the best part: they're buy1take1 for 150 pesos! Solid!",
                        upvoteList: [3],
                        downvoteList: [],
                        comments: ['post3_1']
                    },
                    {
                        postID: 4,
                        title: 'Makati Pizza Places',
                        userID: 1,
                        tag: 'Query',
                        date: new Date('2022-12-25'),
                        desc: "Does anyone know of any good pizza places in the makati area? ive been to gino's and el rizzante but neither of them were very good lol. i would also prefer places that offer vegan pizza. thanks in advance.",
                        body: "Does anyone know of any good pizza places in the makati area? ive been to gino's and el rizzante but neither of them were very good lol. i would also prefer places that offer vegan pizza. thanks in advance.",
                        upvoteList: [3, 4],
                        downvoteList: [5, 1, 2],
                        comments: ['post4_1']
                    },
                    {
                        postID: 5,
                        title: 'Pandemic & Food',
                        userID: 4,
                        tag: 'Meta',
                        date: new Date('2023-5-25'),
                        desc: "Filipinos love to eat. Consider that a fact! When the pandemic happened and everyone was forced to stay at home, suddenly everyone became a food blogger.From traditional adobo and sinigang to mouthwatering lechon and halo-halo, our cuisine is a treasure trove of flavors and culinary delights. Being confined to our homes gave us the perfect opportunity to explore our passion for cooking and share it with the world. In the virtual realm, social media platforms became flooded with beautifully plated dishes, step-by-step recipe tutorials, and heartfelt stories behind each creation. It was inspiring to witness the creativity and resourcefulness of our fellow Filipinos in the kitchen. People started sharing family recipes, secret ingredients, and even their own twists on classic dishes. Food blogging during the pandemic became more than just a hobby; it became a way to connect and support one another. The online food community flourished with like-minded individuals who were eager to exchange ideas, offer cooking tips, and support local food businesses. It created a sense of unity and camaraderie, even when we were physically apart. As we continue to navigate through these challenging times, let's not forget the joy that food brings us. Whether it's recreating nostalgic dishes from our childhood or discovering new flavors, let's celebrate the resilience of the Filipino spirit through our shared love for food. Together, we can turn our kitchens into creative sanctuaries and our food blogs into platforms of inspiration and connection. So, grab your aprons, sharpen your knives, and let's embark on this culinary journey together. What's your favorite Filipino dish that you've shared on your food blog? Any tips for aspiring food bloggers looking to make their mark in the digital foodie world? Let's keep the foodie revolution alive!",
                        body: "Filipinos love to eat. Consider that a fact! When the pandemic happened and everyone was forced to stay at home, suddenly everyone became a food blogger.From traditional adobo and sinigang to mouthwatering lechon and halo-halo, our cuisine is a treasure trove of flavors and culinary delights. Being confined to our homes gave us the perfect opportunity to explore our passion for cooking and share it with the world. In the virtual realm, social media platforms became flooded with beautifully plated dishes, step-by-step recipe tutorials, and heartfelt stories behind each creation. It was inspiring to witness the creativity and resourcefulness of our fellow Filipinos in the kitchen. People started sharing family recipes, secret ingredients, and even their own twists on classic dishes. Food blogging during the pandemic became more than just a hobby; it became a way to connect and support one another. The online food community flourished with like-minded individuals who were eager to exchange ideas, offer cooking tips, and support local food businesses. It created a sense of unity and camaraderie, even when we were physically apart. As we continue to navigate through these challenging times, let's not forget the joy that food brings us. Whether it's recreating nostalgic dishes from our childhood or discovering new flavors, let's celebrate the resilience of the Filipino spirit through our shared love for food. Together, we can turn our kitchens into creative sanctuaries and our food blogs into platforms of inspiration and connection. So, grab your aprons, sharpen your knives, and let's embark on this culinary journey together. What's your favorite Filipino dish that you've shared on your food blog? Any tips for aspiring food bloggers looking to make their mark in the digital foodie world? Let's keep the foodie revolution alive!",
                        upvoteList: [],
                        downvoteList: [5, 1, 2, 3, 4],
                        comments: ['post5_1']
                    },
                ])
            }
            catch(err){
                console.log(err)
            }
        }

        if(await Comment.countDocuments() === 0) {
            try{
                console.log("populating comments")
                const initialComments = await Comment.create([
                    {
                        commentID: 'post2_1',
                        desc: "hahahahha XDDDDDDD",
                        body: "<p>hahahahha XDDDDDDD</p>",
                        postID: 2 ,
                        userID: 1,
                        comments: ['post2_3']
                    },
                    {
                        commentID: 'post2_2',
                        desc: "delete this",
                        body: "<p>delete this</p>",
                        postID: 2,
                        userID: 3,
                        comments: []
                    },
                    {
                        commentID: 'post3_1',
                        desc: "Will go try this out some time!",
                        body: "<p>Will go try this out some time!</p>",
                        postID: 3,
                        userID: 5,
                        comments: []
                    },
                    {
                        commentID: 'post4_1',
                        desc: "I'd suggest Crosta though I'm not too sure on their vegan options.",
                        body: "<p>I'd suggest Crosta though I'm not too sure on their vegan options.</p>",
                        postID: 4,
                        userID: 4,
                        comments: []
                    },
                    {
                        commentID: 'post5_1',
                        desc: "Nice read!",
                        body: "<p>Nice read!</p>",
                        postID: 5,
                        userID: 5,
                        comments: []
                    },
                    {
                        commentID: 'post2_3',
                        desc: "ye",
                        body: "<p>ye</p>",
                        parentComment: "post2_1",
                        postID: 2,
                        userID: 5,
                        comments: []
                    },
                ])
            }
            catch(err) {
                console.log(err)
            }
        }

        if(await currUser.countDocuments() === 0) {
            try{
                console.log("setting initial user")
                const initalUser = await currUser.create({})
            }
            catch (err){
                console.log(err)
            }
        }
        
    }  

}

//exports the object `database` (defined above)when another script exports from this file
module.exports = database;