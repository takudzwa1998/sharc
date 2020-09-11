const express = require('express');
const router = new express.Router();
const Buoy_One = require('../BE_buoy_models/Buoy_One');
var prependFile = require('prepend-file');
var fs = require('fs');
var http = require('http');

//routes
router.post('/save_buoy', (req, res)=>{
  console.log(req.body.buoy_tag);
/*  Buoy_One.find({ })
  .then((data)=>{
    console.log('Data ', data);
    res.json(data);
  })
  .catch((error)=>{
    console.log('error', error)

  */
/*  const data={
    GPS_Location: 'This is the GPS Location',
    temperature: 65
  };*/

  /*const new_Buoy_One = new Buoy_One(data);//instance of model */

/*  new_Buoy_One.save((error)=>{
    if (error){
      console.log("Error: Something happened, data not saved");
      return;
    }
    return res.json({msg:"Data is saved to Mongo"});
  }); */

  //create new file for new buoy
  fs.appendFile('BE_buoy_models/'+req.body.buoy_tag+'.js',
    "const mongoose = require('mongoose');"+"\n"+
    "const Schema = mongoose.Schema;"+"\n"+"\n"+
    "const BuoySchema = new Schema({"+"\n"+
    req.body.param1+":"+"String,"+"\n"+
    req.body.param2+":"+"String,"+"\n"+
    req.body.param3+":"+"String,"+"\n"+
    "gps_location"+":"+"String"+"});\n"+
    "const "+req.body.buoy_tag+" = mongoose.model("+"\'"+req.body.buoy_tag+"\'"+", BuoySchema);"+"\n"+
    "module.exports = "+req.body.buoy_tag+";"
   , function (err,data) {
    if (err) {
      return console.log(err);
    }
    console.log("Append File Data ", data);
  });
  //add declaration line to api.js
  prependFile('BE_routes/api.js',
  'const '+req.body.buoy_tag+' = '+
  'require(\'../BE_buoy_models/'+req.body.buoy_tag+'\');\n',
  function(error){
    if (error){
      console.log(error);
    }
  }
  );

  //var new_collection_name ="new_"+String(req.body.buoy_tag);
  const Latest_buoy = require('../BE_buoy_models/'+req.body.buoy_tag);
  const new_collection_name =new Latest_buoy(req.body);

/*  new_collection_name.save((error)=>{
      if (error){
        console.log("Error: Something happened, data not saved");
        return;
      }
      return res.json({msg:"Data is saved to Mongo"});
    });*/


/*  fs.appendFile('./BE_routes/api.js',
  'const '+req.body.buoy_tag+' = '+
  'require(\'../BE_buoy_models/'+req.body.buoy_tag+'\');\n'
  , function (err,data) {
   if (err) {
     return console.log(err);
   }
   console.log("Append File Data ", data);
 });*/

  console.log("Received Body: ", req.body);
  res.json({
    msg:"data received"
  })


} );

module.exports = router;
