const dataset_2mongoose = require('mongoose');
const dataset_2Schema = dataset_2mongoose.Schema;

const BuoySchema = new dataset_2Schema({
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
const dataset_2 = dataset_2mongoose.model("dataset_2", BuoySchema,"dataset_2");
const newdataset_2=new dataset_2(data);
newdataset_2.save((error)=>{
if (error){
console.log("Error: Something happened, data not saved");
return;}
return "Data is saved to Mongo!!!"});
