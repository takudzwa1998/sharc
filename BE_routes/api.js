
require('../BE_buoy_models/Buoy_Two');
const express = require('express');
const router = new express.Router();
const Buoy_One = require('../BE_buoy_models/Buoy_One');
require('../BE_buoy_models/Buoy_One');
var prependFile = require('prepend-file');
var fs = require('fs');
var http = require('http');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//routes

router.post('/save_buoy', (req, res)=>{
/*  Buoy_One.find({ })
  .then((data)=>{
    console.log('Data ', data);
    res.json(data);
  })
  .catch((error)=>{
    console.log('error', error)

  */
  /*const data={
    buoy_tag:req.body.buoy_tag,
    rockblock_link:req.body.rockblock_link,
    param1:req.body.param1,
    param2:req.body.param2,
    param3:req.body.param3,
    gps_location:req.body.gps_location
  };*/

/*
  const BuoySchema = new Schema({
  Temperature:String,
  Humidity:String,
  Pressure:String,
  gps_location:String});
  const Buoy_Two = mongoose.model('Buoy_Two', BuoySchema);
  const newBuoy_Two=new Buoy_Two(data);
  newBuoy_Two.save((error)=>{
  if (error){
  console.log("Error: Something happened, data not saved");
  return;}
  return res.json({msg:"Data is saved to Mongo"});});
*/
  //make buoy file
  fs.appendFile('../sharc/BE_buoy_models/'+req.body.buoy_tag+'.js',
    "const "+req.body.buoy_tag+"mongoose"+" = require('mongoose');"+"\n"+
    "const "+req.body.buoy_tag+"Schema = "+req.body.buoy_tag+"mongoose.Schema;"+"\n"+"\n"+
    "const BuoySchema = new "+req.body.buoy_tag+"Schema({"+"\n"+
    req.body.param1+":"+"String,"+"\n"+
    "rockblock_link"+":"+"String,"+"\n"+
    req.body.buoy_tag+":"+"String,"+"\n"+
    req.body.param2+":"+"String,"+"\n"+
    req.body.param3+":"+"String,"+"\n"+
    "gps_location"+":"+"String"+"});\n"+
    "  const data={"+"\n"+
    req.body.buoy_tag+":"+"\""+req.body.buoy_tag+"\""+",\n"+
    "rockblock_link"+":"+"\""+req.body.rockblock_link+"\""+",\n"+
    "gps_location"+":"+"\""+req.body.gps_location+"\""+",\n"+
    req.body.param1+":"+"\""+req.body.param1+"\""+",\n"+
    req.body.param2+":"+"\""+req.body.param2+"\""+",\n"+
    req.body.param3+":"+"\""+req.body.param3+"\""+"\n"+
    "};"+"\n"+
    "const "+req.body.buoy_tag+" = "+req.body.buoy_tag+"mongoose.model("+"\""+req.body.buoy_tag+"\""+", BuoySchema,"+"\""+req.body.buoy_tag+"\""+");"+"\n"+
    "const "+ "new"+req.body.buoy_tag+"=new "+req.body.buoy_tag+"(data);"+"\n"+
    "new"+req.body.buoy_tag+".save((error)=>{"+"\n"+
    "if (error){"+"\n"+
          "console.log(\"Error: Something happened, data not saved\");"+"\n"+
          "return;}"+"\n"+
        "return \"Data is saved to Mongo!!!\"});"+"\n"
   , function (error) {
    if (error) {
      console.log(error);
    }
  });

  //add declaration line to api.js
  prependFile('BE_routes/api.js', 'require(\''+'../BE_buoy_models/'+req.body.buoy_tag+'\');'+'\n')

/*  fs.appendFile('./BE_routes/api.js',
  'const '+req.body.buoy_tag+' = '+
  'require(\'../BE_buoy_models/'+req.body.buoy_tag+'\');\n'
  , function (err,data) {
   if (err) {
     return console.log(err);
   }
   console.log("Append File Data ", data);
 });

  console.log("Received Body: ", req.body);
  res.json({
    msg:"data received"
  })*/

} );

router.post('/remove_buoy', (req,res)=>{
  //removing file import
  var buoy_import = 'require(\'../BE_buoy_models/'+req.body.buoy_tag+'\');'
  var api_file = fs.readFileSync('BE_routes/api.js', 'utf-8');
  var remove_buoy_import = api_file.replace(buoy_import, '','utf-8');
  fs.writeFileSync('BE_routes/api.js',remove_buoy_import,'utf-8');

  //removing file
  fs.unlink('BE_buoy_models/'+req.body.buoy_tag+'.js', function (err){
    if (err) throw err;
    console.log("Deleted Nicely");
  }
);

  //must also remove collection
  //doing that later
  if (req.body.checkbox_state){
    var MongoClient  = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";
    MongoClient.connect(url,{
      useNewUrlParser:true,
      useUnifiedTopology:true
    }, function(err, db) {
    if (err) throw err;
      var mydb = db.db("demo_db");
      mydb.collection(req.body.buoy_tag).drop(function(err, delOK) {
      if (err) throw err;
      if (delOK) console.log(req.body.buoy_tag + " Collection deleted");
      db.close();
    });
});
  }
  else{
    console.log("Collection Not deleted");
  }

});

module.exports = router;
