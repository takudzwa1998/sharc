//****************************************************************************************************************************//
//                API for Extracting Data from link
//All Mongo DB Database functions adapted from : w3schools.com {https://www.w3schools.com/nodejs/nodejs_mongodb_create_db.asp}
//ReadStream code functions adapted from: https://dev.to/ {https://dev.to/isalevine/parsing-csv-files-in-node-js-with-fs-createreadstream-and-csv-parser-koi}
//bcrypt encryption code functionality adapted from: https://www.npmjs.com/package/bcrypt
//Code modified by: Takudzwa Shumbamhini
//****************************************************************************************************************************//

const express = require('express');
const router = new express.Router();
var prependFile = require('prepend-file');
var fs = require('fs');
const mongoose = require('mongoose');
const axios = require('axios');
const Path = require('path');
var csv = require("csv-parser");
var es = require('event-stream')
var MongoClient  = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var dwn=0;
var date = new Date();

// function to donwload and save
function download_Buoy_Data(collection, link){
  var init = Date.parse(date);
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
   console.log("Time elapsed: "+ ( (Date.parse(new Date())) - init ) )

}

//function to add to databasess
function add_to_database(collection, data){

  MongoClient.connect(url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
  }, function(err, db) {
  if (err) throw err;
    var mydb = db.db("demo_db");
    mydb.collection(collection).insertOne(data, function(err, res) {
      if (err) throw err;
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
mydatabase.collection("buoys_names").find({ buoy_tag: req.body.tag}).toArray(function(err, result) {
  if (err) throw err;
    console.log("Result: "+result[0].buoy_tag)
    download_Buoy_Data(result[0].buoy_tag, result[0].buoy_link)
  db.close();

});
});
});

module.exports = router;
