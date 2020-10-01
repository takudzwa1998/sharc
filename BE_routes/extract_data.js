const express = require('express');
const router = new express.Router();
var prependFile = require('prepend-file');
var fs = require('fs');
var http = require('http');
const mongoose = require('mongoose');
const axios = require('axios');
const csvtojson =require("csvtojson");
//var csv = require('csv-sstream');
var request = require('request');
const Path = require('path');
var csv = require("csv-parser");
var split=require("split");
var es = require('event-stream')
var MongoClient  = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var dwn=0;
const csvFilePath='./BE_routes/Sample_buoy0.csv';


// function to donwload and save
function download_Buoy_Data(collection, link){
  console.log("Downloadig data phase");
  const path = Path.join(__dirname,'buoy_data_files',collection+dwn+'.csv')
  //const demopath = Path.resolve(__dirname,'SB_03.csv')
  dwn=dwn+1;
console.log("path: "+ path);
  axios({
    url:link,
    method:'GET',
    responseType: 'stream'
  })
   .then((response)=>{
     response.data.pipe(fs.createWriteStream(path))
    console.log("data RECEIVED & SAVED, Now Extracting");
     //3. Extract the data from the downloaded files and save to db
     const results=[];
     fs.createReadStream(path)
      .pipe(csv())
      .on('data',(row)=>{
        //add_to_database(collection, row)
        results.push(row)
        //console.log(row)
      })
      .on('end',()=>{
        for (var i=0;i<results.length;i++){
          console.log("Results Are: "+results[i].Batteryoltage);
        }
      });

/*
     csvtojson().fromFile(path)
   .then(jsonObj=>{
     console.log("Extraction Successful")
     console.log("Length: "+Object.keys(jsonObj).length)
     //console.log(jsonObj);
     var count = Object.keys(jsonObj).length;
       for(var i=0;i<count;i++){
         add_to_database(collection, jsonObj[i])
     }
       console.log("Data Saved");
   })
*/
   })
   .catch((error)=>{
     console.log(error);
   });;

}

//function to add to databases

function add_to_database(collection, data){
  /*
  var first_load=data.Payload.substring(
    data.Payload.indexOf("01") + 2,
    data.Payload.indexOf("d02")
);
  var second_load=data.Payload.substring(
  data.Payload.lastIndexOf("d02") + 3,
  data.Payload.indexOf("d03")
);
  var thrid_load=data.Payload.substring(
  data.Payload.lastIndexOf("d03") + 3,
  data.Payload.indexOf("d04")
);
  var fourth_load=data.Payload.substring(
  data.Payload.lastIndexOf("d04") + 3,
  data.Payload.lastIndexOf("d")
);
  const compiled_data={
  date_time:data["Date Time (UTC)"],
  direction:data.Direction,
  gps_location:"None ATM",
  Temperature:first_load,
  Humidity:second_load,
  Pressure:thrid_load,
  luminous_intensity:fourth_load
}
*/
  MongoClient.connect(url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
  }, function(err, db) {
  if (err) throw err;
    var mydb = db.db("demo_db");
    mydb.collection("sample_buoy").insertOne(data, function(err, res) {
      if (err) throw err;
      console.log(data)
      db.close();
    });
});

}

router.post('/ext', (req, res)=>{

//1. Get all the rockblock links from the db
MongoClient.connect(url,{
  useNewUrlParser:true,
  useUnifiedTopology:true
}, function(err, db) {
if (err) throw err;
var mydatabase = db.db("demo_db");
//var query = { buoy_tag, buoy_link};
mydatabase.collection("buoy_links").find({}).toArray(function(err, result) {
  if (err) throw err;

    //2. Loop through all the links and tags, pulling and saving
  var count = Object.keys(result).length;
  for(var i=0;i<count;i++){
    download_Buoy_Data(result[i].buoy_tag, result[i].buoy_link)
    //console.log(result[i].buoy_link);
  }
  db.close();
});
});


});

module.exports = router;
