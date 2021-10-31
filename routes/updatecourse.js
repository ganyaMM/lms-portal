const express = require("express");
const path = require("path");


const router = express.Router();

var collection = []


router.get('/updatecourse', (req,res) => {
    res.render('updatecourse.pug');
});

// router.post('/kira', (req,res)=>{
//     console.log(req.body);
//     res.render('viewcourse.pug');
// })






module.exports = router;