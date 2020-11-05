//*****************************************************************************************************************************//
//                API for adding and removing buoys, and sending email
//All Mongo DB Database functions adapted from : w3schools.com {https://www.w3schools.com/nodejs/nodejs_mongodb_create_db.asp}
//Nodemailer Email API Original code adapted from: w3schools.com {https://www.w3schools.com/nodejs/nodejs_email.asp}
//Code modified by: Takudzwa Shumbamhini
//*****************************************************************************************************************************//
require('../BE_buoy_models/Stormer');

require('../BE_buoy_models/Black_pearl');
require('../BE_buoy_models/Sinbads_crew');
const express = require('express');
const router = new express.Router();
var prependFile = require('prepend-file');
var fs = require('fs');
var http = require('http');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var nodemailer = require('nodemailer');

var MongoClient  = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
//routes

router.post('/save_buoy', (req, res)=>{
  //make buoy file
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
    "const "+req.body.buoy_tag+" = "+req.body.buoy_tag+"mongoose.model("+"\""+req.body.buoy_tag+"\""+", BuoySchema,"+"\""+req.body.buoy_tag+"\""+");"+"\n"
   , function (error) {
    if (error) {
      console.log(error);
    }
  });
  //add declaration line to api.js
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
    var mydb = db.db("buoys_names");
    mydb.collection("buoys_names").insertOne(link_name, function(err, res) {
      if (err) throw err;
    });
});
res.status(200).send("Buoy Link and name Saved");
res.end();
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
res.status(200).send("Buoy Deleted Nicely");
  }
  else{
    console.log("Collection Not deleted");
  }
  res.end();

});

router.post('/send_mail', (req, res)=>{
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: req.body.email,
      pass: req.body.password
    }
  });

  var mailOptions = {
    from: req.body.email,
    to: 'shmtak004@myuct.ac.za',
    subject: req.body.subject,
    text: req.body.message
  };
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      res.send({"message":"Email Sent"});
    }
  });

  res.send({"message":"Email Sent"});
  res.end();

});

module.exports = router;
