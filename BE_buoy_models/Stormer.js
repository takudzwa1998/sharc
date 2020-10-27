const Stormermongoose = require('mongoose');
const StormerSchema = Stormermongoose.Schema;

const BuoySchema = new StormerSchema({
Temperature:String,
date_time:String,
direction:String,
Humidity:String,
Pressure:String,
luminous_intensity:String,
gps_location:String});
const Stormer = Stormermongoose.model("Stormer", BuoySchema,"Stormer");
