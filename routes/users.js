const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

// user model
const User = require('../models/User');
const { forwardAuthenticated } = require('../config/auth');


//loginpage
router.get('/login', forwardAuthenticated, (req,res) => res.render('login'));


//register page
router.get('/register',forwardAuthenticated, (req,res) => res.render('register'));

// //createnewcourse page
// router.get('/createnewcourse', (req,res) => res.render('createnewcourse'));


// Register Handle
router.post('/register', (req, res) => {
    const { name, InstructorOrStudent, email, password, password2 } = req.body;
    let errors = [];


// check require fields
 if(!name || !InstructorOrStudent || !email || !password || !password2) {
    errors.push({ msg: 'please fill in all the fields'});
}

//check password match
 if(password !== password2) {
    errors.push({ msg: 'password do not match'});
}

//check pass length
 if(password.length < 8){
    errors.push({ msg: 'password should be atleast 8 characters'});
}

 if(errors.length > 0) {
     res.render('register',{
         errors,
         name,
         InstructorOrStudent,
         email,
         password,
         password2
    });
} else {
// validation passed
    User.findOne({ email: email}).then(user => {
            if(user){
                //user exists
                errors.push({ msg: 'email is already registred'});
                res.render('register',{
                    errors,
                    name,
                    InstructorOrStudent,
                    email,
                    password,
                    password2
                });
            } else {
                const newUser = new User({
                    name,
                    InstructorOrStudent,
                    email,
                    password
                });

                // hash pssword
                bcrypt.genSalt(10, (err, salt) =>{ 
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;

                        //set password to hashed
                    newUser.password = hash;
                        // save user
                        newUser
                            .save()
                            .then(user => {
                                req.flash('success_msg', 'you are now registred and can login'
                                );
                                res.redirect('/users/login');
                            })
                            .catch(err => console.log(err));

                });
            });
        }
    }); 
    }
});






// //createnewcourse Handle
// router.post('/creatingcourse', (req, res) => {
//     const { firstname, categoryname, liner, hours, Language, myfile } = req.body;
//     let errors2 = [];

//     // check require fields
//  if(!firstname || !categoryname || !liner || !hours || !Language || !myfile) {
//     errors2.push({ msg: 'please fill in all the fields'});
// }
// if(errors.length > 0) {
//     res.render('register',{
//         errors,
//         firstname,
//         liner,
//         email,
//         hours,
//         Language,
//         myfile
//    });
// } else{
//     console.log("done")
// }

//login handle
router.post('/login', (req, res, next) => {
    passport.authenticate('local',{
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

// logout handle
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'you are logged out');
    res.redirect('/users/login');
});

module.exports = router;