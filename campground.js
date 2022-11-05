const mongoose = require('mongoose');

const campgroundSchema = new mongoose.Schema({
    city:String,
admin_name:String,
geometry: {
    type: {
      type: String,
      enum: ['Point'], 
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
image:String,
    title:String,
    place:String,

reviews:[
    { type:mongoose.Schema.Types.ObjectId ,
         ref:'Review' }
]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
})

module.exports  = mongoose.model('Campground' , campgroundSchema);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     