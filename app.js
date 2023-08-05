const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const exphbs = require('express-handlebars');
const db = require('./src/db/db.js');

async function main() {
  const app = express();

  // Set up handlebars
  app.engine('hbs', exphbs.engine({ extname: '.hbs' }));
  app.set('view engine', 'hbs');
  app.set("views", "./src/views");

  // Serve static files from the "public" directory
  app.use('/static',express.static('public'));

  //accessing json formats
  app.use(express.json());

  // use index routes
  const indexRouter = require('./src/routes/base');
  app.use('/', indexRouter);

  const authRouter = require('./src/routes/auth');
  app.use('/auth', authRouter);

  //use post routes
  const postRouter = require('./src/routes/posts');
  app.use('/posts', postRouter);

  //use user routes
  const userRouter = require('./src/routes/users');
  app.use('/users', userRouter);

  //use error routes
  const errorRouter = require('./src/routes/error');
  app.use(errorRouter);

  //connect to database
  await db.connect()

  // Start the server
  app.listen(process.env.SERVER_PORT, () => {
    console.log('Server started on http://localhost:' + process.env.SERVER_PORT);
  });

  
  //generate sample data
  if (process.env.NODE_ENV === "development") {
    db.generateSampleData()
  }
}

main();

