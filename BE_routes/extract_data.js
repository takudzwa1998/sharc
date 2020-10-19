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
        results.push(row)
      })
      .on('end',()=>{
        for (var i=0;i<results.length;i++){
          add_to_database(collection, results[i])
        }
        console.log("Finished Extracting :)")
      });

   })
   .catch((error)=>{
     console.log(error);
   });;

}

//function to add to databases
function add_to_database(collection, data){

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
console.log("Tag received: "+ req.body.tag)
//1. Get all the rockblock links from the db
MongoClient.connect(url,{
  useNewUrlParser:true,
  useUnifiedTopology:true
}, function(err, db) {
if (err) throw err;
var mydatabase = db.db("buoys_names");
var query = { buoy_tag: req.body.tag};
mydatabase.collection("buoys_names").find({}, query).toArray(function(err, result) {
  if (err) throw err;
    download_Buoy_Data(result[0].buoy_tag, result[0].buoy_link)
  db.close();
});
});


});

module.exports = router;
