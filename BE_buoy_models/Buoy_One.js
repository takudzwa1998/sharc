const mongoose = require('mongoose');

//creating Schema
const Schema = mongoose.Schema;
const BuoySchema = new Schema({
  GPS_Location: String,
  temperature: Number
});

//Model

const Buoy_One = mongoose.model("Buoy #1", BuoySchema);//instance

module.exports = Buoy_One;
