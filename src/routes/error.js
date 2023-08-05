const express = require('express');
const router = express.Router();

router.use((req, res) => {
    res.status(404).render('error', { layout: 'main', title: "Error" });
});

module.exports = router;