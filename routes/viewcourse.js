
const express = require("express");
const path = require("path");

const router = express.Router();


//const hello = [ ];
const Product = require("../models/usercollection");
const repo = require("../dbrepos/productrepos");

router.get('/viewcourse', (req,res,next) => {
    repo.getAll((products) => {
        console.log("product received")
        res.render('viewcourse.pug',{products: products});

    });
});

router.get( '/update',(req,res) => {
    const id = req.query.id; 
    repo.get(id, (result)=>{
        res.render("updatecourse.pug", {product: result});
    })
    
});



router.post('/kira', (req,res,next)=>{
    // console.log('post request is recived')
    console.log(req.body);
    // hello.push(req.body);
    const product = new Product(req.body.firstname, req.body.email, req.body.categoryname, req.body.liner, req.body.hours, req.body.Language, req.body.myfile, req.body.message);
    repo.add(product);
    // product.save();
    repo.getAll((products) => {
        res.render('viewcourse.pug',{products: products});

    });
});



router.post('/update', (req,res,next)=>{
    // console.log('post request is recived')
    console.log(req.body);
    // hello.push(req.body);
    const product = new Product(req.body.firstname, req.body.email, req.body.categoryname, req.body.liner, req.body.hours, req.body.Language, req.body.myfile, req.body.message, req.body._id);
    repo.update(product,()=>{
          // product.save();
    repo.getAll((products) => {
    res.render('viewcourse.pug',{products: products});

        });
    });
  
});




router.get('/delete', (req,res,next)=>{
   const id = req.query.id;
   repo.delete(id, () => {
       repo.getAll((products) => {
           res.render('viewcourse.pug', {products: products});
       })
   })
  
});





module.exports = router;