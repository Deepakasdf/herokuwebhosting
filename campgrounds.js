const Campground = require('./campground');
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken : mapBoxToken });




module.exports.new = async (req,res) =>{
    const campgrounds = await Campground.find({})
   res.render('new.ejs',  {campgrounds })
}

module.exports.form =   async(req,res)=>{
    res.render('form.ejs')
}



  module.exports.show = async(req,res,next)=>{
   // try{
  const campground =  await Campground.findById(req.params.id).populate('reviews');
    res.render('show.ejs', {campground});
   // }
   // catch(err){
    //next(new ExpressError('campground not found' , 404))
   // }
  }


  module.exports.createpost = async(req,res,next)=>{

const geoData = await geocoder.forwardGeocode({
  query:req.body.campground.city,
  limit:1
}).send()

    const campground = new Campground(req.body.campground);
   campground.geometry = geoData.body.features[0].geometry;
   console.log(campground)
   await campground.save();
   res.redirect(`/campground/${campground._id}`)
   }


  
 module.exports.deletecampground = async (req,res)=>{
    const { id } = req.params;
     const campground = await Campground.findByIdAndDelete(id);
     req.flash('success', 'successfuly deleted')
    res.redirect('/campground')
  }