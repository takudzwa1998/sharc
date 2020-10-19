const dataset_3mongoose = require('mongoose');
const dataset_3Schema = dataset_3mongoose.Schema;

const BuoySchema = new dataset_3Schema({
Temperature:String,
date_time:String,
direction:String,
Humidity:String,
Pressure:String,
luminous_intensity:String,
gps_location:String});
  const data={
date_time:"DD/MM/YYYY",
direction:"undefined",
gps_location:"undefined",
Temperature:"Temperature",
Humidity:"Humidity",
Pressure:"Pressure",
luminous_intensity:"luminous_intensity"
};
const dataset_3 = dataset_3mongoose.model("dataset_3", BuoySchema,"dataset_3");
const newdataset_3=new dataset_3(data);
newdataset_3.save((error)=>{
if (error){
console.log("Error: Something happened, data not saved");
return;}
return "Data is saved to Mongo!!!"});
