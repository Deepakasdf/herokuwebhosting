module.exports.islogedin = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.flash('success', 'sorry you have to login');
       return  res.redirect('/login')
    }
    next();
}