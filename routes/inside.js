const express = require("express");
const path = require("path");

const router = express.Router();



router.get('/inside', (req,res) => {
    res.render('insidecourse.pug');
});



module.exports = router;