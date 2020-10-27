const Poseidons_tridentmongoose = require('mongoose');
const Poseidons_tridentSchema = Poseidons_tridentmongoose.Schema;

const BuoySchema = new Poseidons_tridentSchema({
Temperature:String,
date_time:String,
direction:String,
Humidity:String,
Pressure:String,
luminous_intensity:String,
gps_location:String});
const Poseidons_trident = Poseidons_tridentmongoose.model("Poseidons_trident", BuoySchema,"Poseidons_trident");
