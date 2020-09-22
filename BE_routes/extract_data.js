const express = require('express');
const router = new express.Router();
var prependFile = require('prepend-file');
var fs = require('fs');
var http = require('http');
const mongoose = require('mongoose');
const axios = require('axios');
const csvtojson =require("csvtojson");
const csvFilePath='./SB_03.csv';
const Path = require('path')
var MongoClient  = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

//async function to donwload and save
function download_Buoy_Data(collection, link){

  const path = Path.resolve(__dirname,'bouy_data_files',collection+'.csv')
console.log("path: "+ path);
  axios({
    url:link,
    method:'GET',
    responseType: 'stream'
  })
   .then((response)=>{
     response.data.pipe(fs.createWriteStream(path))
     console.log("data RECEIVED & SAVED");
   })
   .catch((error)=>{
     console.log(error);
   });;

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



  console.log("In Extracting data")
  csvtojson().fromFile(csvFilePath)
.then((jsonObj)=>{
  var count = Object.keys(jsonObj).length;
  /*  for(var i=0;i<count;i++){
    console.log(jsonObj[i].Payload);
  }*/
})

});

module.exports = router;
