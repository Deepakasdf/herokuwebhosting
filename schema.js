const baseJoi = require('joi');
const sanitizehtml = require('sanitize-html');
 
const extension = (Joi)=>({
    type:'string',
base:Joi.string(),
messages:{
   'string.escapeHTML':'{{#label}} must not be include HTML!'
},
rules:{
    escapeHTML:{
      validate(value , helpers){
            const clean = sanitizehtml(value ,{
                allowedtags:[],
              allowedAttributes:{}
           });
           if(clean !== value) return helpers.error('string.escapeHTML',{value});
            return clean
        }
    }
}
})






const Joi = baseJoi.extend(extension);


module.exports.campgroundSchema = Joi.object({
    campground:Joi.object({
city:Joi.string().required().escapeHTML(),
//geometry:Joi.string().required(),
//coordinates:Joi.number().required(),
//image:Joi.string().required(),
place:Joi.string().required().escapeHTML(),
    }).required()
})