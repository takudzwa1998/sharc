const Buoy_Twomongoose = require('mongoose');
const Buoy_TwoSchema = Buoy_Twomongoose.Schema;

const BuoySchema = new Buoy_TwoSchema({
Temperature:String,
rockblock_link:String,
Buoy_Two:String,
Humidity:String,
Pressure:String,
gps_location:String});
  const data={
Buoy_Two:"Buoy_Two",
rockblock_link:"RockBlock Link",
gps_location:"33.9577° S, 18.4612° E",
Temperature:"Temperature",
Humidity:"Humidity",
Pressure:"Pressure"
};
const Buoy_Two = Buoy_Twomongoose.model("Buoy_Two", BuoySchema,"Buoy_Two");
const newBuoy_Two=new Buoy_Two(data);
newBuoy_Two.save((error)=>{
if (error){
console.log("Error: Something happened, data not saved");
return;}
return "Data is saved to Mongo!!!"});
