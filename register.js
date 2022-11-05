const express = require('express');
const router = express.Router();
const User = require('./user')
const catchAsync = require('./catchAsync');
const ExpressError = require('./ExpressError');
const passport = require('passport');
//const islogedin = require('./middleware');
const registers = require('./registers')


router.get('/register', registers.displayregister)
router.post('/register' , catchAsync(registers.postregister))


  router.get('/login', (req,res)=>{
    res.render('login.ejs')
})

router.post('/login', passport.authenticate('local', {failureFlash:true , failureRedirect:'/login'}) , (req,res)=>{
    req.flash('success', 'welcome back');
    res.redirect('/home')
})

router.get('/logout', (req, res, next)=> {
  req.logout((err) =>{
    if (err) {
       return next(err); 
      }
      req.flash('success', 'goodbye')
    res.redirect("/campground");
  });
});

  
module.exports = router;