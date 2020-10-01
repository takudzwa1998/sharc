const sample_buoymongoose = require('mongoose');
const sample_buoySchema = sample_buoymongoose.Schema;

const BuoySchema = new sample_buoySchema({
Temperature:String,
date_time:String,
direction:String,
Humidity:String,
Pressure:String,
luminous_intensity:String,
gps_location:String});
  const data={
date_time:"DD/MM/YYYY",
direction:"RockBlock Link",
gps_location:"33.9577° S, 18.4612° E",
Temperature:"Temperature",
Humidity:"Humidity",
Pressure:"Pressure",
luminous_intensity:"luminous_intensity"
};
const sample_buoy = sample_buoymongoose.model("sample_buoy", BuoySchema,"sample_buoy");
const newsample_buoy=new sample_buoy(data);
newsample_buoy.save((error)=>{
if (error){
console.log("Error: Something happened, data not saved");
return;}
return "Data is saved to Mongo!!!"});
