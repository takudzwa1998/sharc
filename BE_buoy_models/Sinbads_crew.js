const Sinbads_crewmongoose = require('mongoose');
const Sinbads_crewSchema = Sinbads_crewmongoose.Schema;

const BuoySchema = new Sinbads_crewSchema({
Temperature:String,
date_time:String,
direction:String,
Humidity:String,
Pressure:String,
luminous_intensity:String,
gps_location:String});
const Sinbads_crew = Sinbads_crewmongoose.model("Sinbads_crew", BuoySchema,"Sinbads_crew");
