const dataset_1mongoose = require('mongoose');
const dataset_1Schema = dataset_1mongoose.Schema;

const BuoySchema = new dataset_1Schema({
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
const dataset_1 = dataset_1mongoose.model("dataset_1", BuoySchema,"dataset_1");
const newdataset_1=new dataset_1(data);
newdataset_1.save((error)=>{
if (error){
console.log("Error: Something happened, data not saved");
return;}
return "Data is saved to Mongo!!!"});
