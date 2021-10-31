const express = require("express");
const path = require("path");

const router = express.Router();



router.get('/createnewcourse', (req,res) => {
    res.render('createnewcourse');
});






module.exports = router;