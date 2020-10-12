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
const sample_buoy = sample_buoymongoose.model("sample_buoy", BuoySchema,"sample_buoy");
