const express = require("express");
const path = require("path");


const router = express.Router();

var collection = []


router.get('/changepassemail', (req,res) => {
    res.render('changepassemail.pug');
});



module.exports = router;