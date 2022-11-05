const Campground = require('./campground');
const register = require('./register');
const User = require('./user');

module.exports.displayregister = (req,res)=>{
    res.render('register.ejs')
}

module.exports.postregister = async(req,res,next)=>{
    try{
    const {email , username , password} = req.body;
    const user = new User({email , username});
    const newUser = await User.register(user, password);
   // console.log(newUser);
   req.login(newUser , (err)=>{
    if(err){
      return next(err);
    }
    req.flash('success', 'welcome to summer camp ')
    res.redirect('/campground')
   })
  
    } catch(e){
        req.flash('sucess' , 'username already exist');
        
    }
  }