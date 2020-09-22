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

var MongoClient  = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
//routes

router.post('/save_buoy', (req, res)=>{
  //make buoy file - WORKS!!
  fs.appendFile('../sharc/BE_buoy_models/'+req.body.buoy_tag+'.js',
    "const "+req.body.buoy_tag+"mongoose"+" = require('mongoose');"+"\n"+
    "const "+req.body.buoy_tag+"Schema = "+req.body.buoy_tag+"mongoose.Schema;"+"\n"+"\n"+
    "const BuoySchema = new "+req.body.buoy_tag+"Schema({"+"\n"+
    req.body.param1+":"+"String,"+"\n"+
    "date_time"+":"+"String,"+"\n"+
    "direction"+":"+"String,"+"\n"+
    req.body.param2+":"+"String,"+"\n"+
    req.body.param3+":"+"String,"+"\n"+
    req.body.param4+":"+"String,"+"\n"+
    "gps_location"+":"+"String"+"});\n"+
    "  const data={"+"\n"+
    "date_time"+":"+"\""+"DD/MM/YYYY"+"\""+",\n"+
    "direction"+":"+"\""+req.body.rockblock_link+"\""+",\n"+
    "gps_location"+":"+"\""+req.body.gps_location+"\""+",\n"+
    req.body.param1+":"+"\""+req.body.param1+"\""+",\n"+
    req.body.param2+":"+"\""+req.body.param2+"\""+",\n"+
    req.body.param3+":"+"\""+req.body.param3+"\""+",\n"+
    req.body.param4+":"+"\""+req.body.param4+"\""+"\n"+
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

  //add declaration line to api.js = WORKS!!
  prependFile('BE_routes/api.js', 'require(\''+'../BE_buoy_models/'+req.body.buoy_tag+'\');'+'\n')

  //add buoy link and buoy name on a seperate Collection
  const link_name ={
    buoy_tag: req.body.buoy_tag,
    buoy_link:req.body.rockblock_link
  }
  MongoClient.connect(url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
  }, function(err, db) {
  if (err) throw err;
    var mydb = db.db("demo_db");
    mydb.collection("buoy_links").insertOne(link_name, function(err, res) {
      if (err) throw err;
      console.log("Buoy Link and name Saved");
      db.close();
    });
});
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
