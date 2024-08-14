var express = require('express');
var router = express.Router();

const passport = require('passport');
const userModel= require('./users')

/* These two line is important kyuki iske bina user register toh krlega but login nahi kr payga */
const localStrategy= require("passport-local");
passport.use(new localStrategy(userModel.authenticate()));


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('mainpage', { title: 'Express' });
});
router.get('/ragister', function(req, res, next) {
  res.render('ragister', { title: 'Express' });
});
router.get('/profile', isLoggedIn,function(req,res,next){
  userModel.findOne({username:req.session.passport.user})
  .then(function(loggedinuser){
    res.render("mainpage",{loggedinuser});
  })
})

router.post('/ragister',function(req,res,next){
  var newUser=new userModel({
  
    username:req.body.username,
    name:req.body.name,
    email:req.body.email,
    desc:req.body.desc
  
  })
  userModel.register(newUser,req.body.password).then(function(u){
    passport.authenticate('local')(req,res,function(){
      res.redirect('/mainpage')
    })
  })
  .catch(function(e){
    res.send(e);
  })
  })
  
  router.get("/dishes", isLoggedIn,function(req,res,next){
    userModel.findOne({username:req.session.passport.user})
    .then(function(loggedinuser){
      userModel.find()
      .then(function(allusers){
        res.render("dishes",{allusers,loggedinuser});
      })
    })
  })
  router.get("/service", isLoggedIn,function(req,res,next){
    userModel.findOne({username:req.session.passport.user})
    .then(function(loggedinuser){
      userModel.find()
      .then(function(allusers){
        res.render("service",{allusers,loggedinuser});
      })
    })
  })
  
router.post('/login', passport.authenticate("local",{
    successRedirect:'/profile',
    failureRedirect:'/'
  }),function(req,res,next){});
  

router.get('/ragister', function(req, res, next){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/ragister');
  });
});

router.get("/friends/:id",function(req,res){
  userModel.findOne({username: req.session.passport.user})
  .then(function(loggedinuser){
    //jisse friend bana rhe uski id le rha
    userModel.findOne({_id:req.params.id})
    .then(function(jissefriendbananahai){
      //ek dusre ko friends array me add krne ke liye
      loggedinuser.friends.push(jissefriendbananahai._id);
      jissefriendbananahai.friends.push(loggedinuser._id);

      //dono ki arrays me changes krne ke liye
      loggedinuser.save().then(function(){
        jissefriendbananahai.save().then(function(){
          res.redirect("/allusers");
        })
      })
    })

  });
})

function isLoggedIn(req,res,next){
if(req.isAuthenticated()){
  return next();
}
else{
  res.redirect('/')
}
}





module.exports = router;
