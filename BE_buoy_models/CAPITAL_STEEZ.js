const CAPITAL_STEEZmongoose = require('mongoose');
const CAPITAL_STEEZSchema = CAPITAL_STEEZmongoose.Schema;

const BuoySchema = new CAPITAL_STEEZSchema({
Temperature:String,
rockblock_link:String,
CAPITAL_STEEZ:String,
Humidity:String,
Pressure:String,
gps_location:String});
  const data={
CAPITAL_STEEZ:"CAPITAL_STEEZ",
rockblock_link:"RockBlock Link",
gps_location:"GPS_Here",
Temperature:"Temperature",
Humidity:"Humidity",
Pressure:"Pressure"
};
const CAPITAL_STEEZ = CAPITAL_STEEZmongoose.model("CAPITAL_STEEZ", BuoySchema,"CAPITAL_STEEZ");
const newCAPITAL_STEEZ=new CAPITAL_STEEZ(data);
newCAPITAL_STEEZ.save((error)=>{
if (error){
console.log("Error: Something happened, data not saved");
return;}
return "Data is saved to Mongo!!!"});
