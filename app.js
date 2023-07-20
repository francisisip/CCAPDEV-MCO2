const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const app = express()

mongoose.connect('mongodb://localhost/(insertnamehere')

// Set up handlebars
app.engine('hbs', exphbs.engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set("views", "./views");

// Serve static files from the "public" directory
app.use('/static',express.static('public'));

//accessing json formats
app.use(express.json())

//routes
app.get('/', (req, res) => {
  res.render('index', {title: "Home"})
})

app.post('/', (req, res) => {
  res.render('index', {title: "Home"})
})

//use post routes
const postRouter = require('./routes/posts')
app.use('/posts', postRouter)

//use user routes
const userRouter = require('./routes/users')
app.use('/users', userRouter)

// Start the server
app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
  });

