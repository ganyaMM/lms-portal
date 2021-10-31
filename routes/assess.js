const express = require("express");
const path = require("path");

const router = express.Router();



router.get('/assess', (req,res) => {
    res.render('assessment.pug');
});



module.exports = router;