const Black_pearlmongoose = require('mongoose');
const Black_pearlSchema = Black_pearlmongoose.Schema;

const BuoySchema = new Black_pearlSchema({
Temperature:String,
date_time:String,
direction:String,
Humidity:String,
Pressure:String,
luminous_intensity:String,
gps_location:String});
const Black_pearl = Black_pearlmongoose.model("Black_pearl", BuoySchema,"Black_pearl");
