const express = require('express');
const expressEjsLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const mongodbconfig = require("./config/mongodb");
var engines = require('consolidate');



//adding course
const addingcourseRoutes = require("./routes/addingcourse");
// const collectionRoutes = require("./routes2/collection");
//view courses
const viewcourseRoutes = require("./routes/viewcourse");
const updatecourseRoutes = require("./routes/updatecourse");
const changepassemailRoutes = require("./routes/changepassemail");
const insideRoutes =require("./routes/inside");
const liveclassRoutes =require("./routes/liveclass");
const assessRoutes =require("./routes/assess");








const app = express();

mongodbconfig.connect(()=>{
    console.log("connected to mongo in express")
})

//for collection
app.use(bodyParser.urlencoded({extended: false}));
app.use('/viewcourse', viewcourseRoutes);

//passport config
require('./config/passport')(passport);


//DB Config
const db = require('./config/keys').MongoURI;


// connect to mongo
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("mongodb connected..."))
    .catch(err => console.log(err));


// for try
 app.engine('html', engines.swig); // take note, using 'html', not 'ejs' or 'pug'..
 app.set('view engine', 'html'); // also 'html' here.


// EJS

 app.use(expressEjsLayouts);
 app.set('view engine', 'pug');
 app.set('view engine', 'ejs');
 




// bodyParser
app.use(bodyParser.urlencoded({ extended: false}));
app.use('/addingcourse', addingcourseRoutes);

app.use('/updatecourse', updatecourseRoutes);
app.use('/changepassemail', changepassemailRoutes);
app.use('/inside', insideRoutes);
app.use('/liveclass', liveclassRoutes);
app.use('/assess', assessRoutes);





//express session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  }));

  //passport middleware
  app.use(passport.initialize());
  app.use(passport.session());


  //connect flash
  app.use(flash());

  // globel vars
  app.use((req, res, next) =>{
      res.locals.success_msg = req.flash('success_msg');
      res.locals.error_msg = req.flash('error_msg)');
      res.locals.error = req.flash('error');
      next();
  });










//routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

 


const PORT = process.env.PORT|| 8080;

app.listen(PORT, console.log(`server is listining on PORT ${PORT}`));