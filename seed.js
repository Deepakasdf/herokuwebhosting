//const { array } = require('joi');
const mongoose = require('mongoose');
const Campground = require('./campground');
const cities = require('./cities');
const { place } = require('./seedhelper');


main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/yelpcamp');
  console.log('connected')}



const sample = array=> array[Math.floor(Math.random() * array.length)]

const samedb = async ()=>{
  for(let i=0 ; i<100 ; i++){
  const random10 = Math.floor(Math.random() * 10);
const camp = new Campground(
 {
  //author:"634c1b59b0d63a77faea25be",

    city: `${cities[random10].city}`,
    admin_name:`${sample(place)}`,
    geometry: { type: 'Point', coordinates: [
 cities[random10].lng,
 cities[random10].lat,
    ]

    },
   image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZW52aXJvbm1lbnR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
  }
)           
 await camp.save();
  }
}

 samedb();

 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 