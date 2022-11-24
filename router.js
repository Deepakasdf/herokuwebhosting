const express = require('express');
  const router = express.Router();
  
  const catchAsync = require('./catchAsync');
const ExpressError = require('./ExpressError');
const Review = require('./review');
const {campgroundSchema} = require('./schema');
const Campground = require('./campground');
const { islogedin } = require('./middleware');
const campgrounds = require('./campgrounds')
//const { storage } = require('./cloudinary/cloud')
//const multer = require('multer');
//const upload = multer({ storage} )



  const validateCampground =((req,res,next)=>{
    const {error} = campgroundSchema.validate(req.body);
    if(error){
      console.log(error);
      const msg = error.details.map(el=>el.message).join(',');
      throw new ExpressError(msg , 404)
    }else{
      next();
    }
    })



  router.get('/', catchAsync(campgrounds.new))

  router.get('/new',islogedin , catchAsync(campgrounds.form))


  router.get('/:id', campgrounds.show);

router.post('/' , validateCampground , campgrounds.createpost)






  //try{ 
  //const result = await cloudinary.uploader.upload(req.file.path)
 // res.send(result)
//  console.log('it work')
 // }catch(err){
 ////   console.log(err)
 //// }
//}








router.delete('/:id', islogedin ,  catchAsync(campgrounds.deletecampground))
      


    router.post('/:id/reviews' ,islogedin ,  catchAsync(async(req,res)=>{
      const campground = await Campground.findById(req.params.id);
      const review = new Review(req.body.review);
      campground.reviews.push(review);
      await campground.save();
      await review.save();
      req.flash('success', 'review added')
      res.redirect(`/campground/${campground._id}`);
}))


    router.delete('/:id/reviews/:reviewId' , islogedin ,  async(req,res)=>{
        const {id , reviewId} = req.params;
        await Campground.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
        await Review.findByIdAndDelete(reviewId);
        req.flash('success', 'review deleted')
        res.redirect(`/campground/${id}`);
      
      })
      



module.exports = router;