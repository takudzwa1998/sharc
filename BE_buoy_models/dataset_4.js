const dataset_4mongoose = require('mongoose');
const dataset_4Schema = dataset_4mongoose.Schema;

const BuoySchema = new dataset_4Schema({
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
const dataset_4 = dataset_4mongoose.model("dataset_4", BuoySchema,"dataset_4");
const newdataset_4=new dataset_4(data);
newdataset_4.save((error)=>{
if (error){
console.log("Error: Something happened, data not saved");
return;}
return "Data is saved to Mongo!!!"});
