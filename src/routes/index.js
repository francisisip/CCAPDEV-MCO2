const authRouter = require('./auth');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', {title: "Home"});
});

router.get("/home", (req, res) => {
  res.redirect("/");
});

router.get("/homepage", (req, res) => {
  res.redirect("/");
});
  
router.post('/', (req, res) => {
  res.render('index', {title: "Home"});
});

router.get('/search', (req, res) => {
  res.render('index', {title: "Home"});
});

router.use(authRouter);

// router.use((req, res) => {
//   res.render("error", {
//       title: "Page not Found."
//   });
// });

module.exports = router;