const express = require('express');
const router = new express.Router();
var prependFile = require('prepend-file');
var fs = require('fs');

var fastcsv = require("fast-csv");
var http = require('http');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Path = require('path');

var MongoClient  = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var all_collections=[]

router.get('/stats', (req, res)=>{

  MongoClient.connect(url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
  }, function(err, db) {
  if (err) throw err;
  var mydatabase = db.db("demo_db");
  mydatabase.collection("sample_buoy").find({}).toArray(function(err, result) {
    if (err) throw err;
    //console.log(result)
    var keys = Object.keys(result)
    res.send(result)
    db.close();
  });
  });

});

router.post('/public_stats', (req, res)=>{
  MongoClient.connect(url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
  }, function(err, db) {
  if (err) throw err;
  var mydatabase = db.db("demo_db");
  mydatabase.collection(req.body.buoy_name).find({}).toArray(function(err, result) {
    if (err) throw err;
    //console.log(result)
    var keys = Object.keys(result)
    res.send(result)
    db.close();
  });
  });

});

router.get('/all_users',(req, res)=>{

  MongoClient.connect(url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
  }, function(err, db) {
  if (err) throw err;
  var mydatabase = db.db("users");
  mydatabase.collection("registered_users").find({}).toArray(function(err, result) {
    if (err) throw err;
    var keys = Object.keys(result)
    res.send(result)
    db.close();
  });
  });

});

router.post('/col_data',(req, res)=>{
//console.log("COl name her: "+req.body.name)
  MongoClient.connect(url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
  }, function(err, db) {
  if (err) throw err;
  var mydatabase = db.db("demo_db");
  mydatabase.collection(req.body.name).find({}).toArray(function(err, result) {
    if (err) throw err;
    res.send(result)
    console.log("file path here: "+ process.env.HOME || process.env.USERPROFILE)
    fastcsv.write(result, {headers: true})
    .on("finish", function(){
      console.log("File saved to server")
    })
    .pipe(fs.createWriteStream(Path.join(process.env.HOME || process.env.USERPROFILE,'downloads/',req.body.name+'DWD.csv')))
    res.download(Path.join(process.env.HOME || process.env.USERPROFILE, 'downloads/'),req.body.name+'DWD.csv' )

    db.close();
  });
  });

});

router.get('/buoys', (req, res)=>{

  MongoClient.connect(url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
  }, function(err, db) {
  if (err) throw err;
  var mydatabase = db.db("demo_db");
  mydatabase.listCollections().toArray(function(err, collections){
      console.log("Collections: "+ collections)
      res.send(collections)
  });

  });

});

router.get('/elements', (req, res)=>{
  var keyfile=[]
  var collection_name=[]

  MongoClient.connect(url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
  }, function(err, db) {
  if (err) throw err;
  var mydatabase = db.db("demo_db");
  mydatabase.listCollections().toArray(function (err, collection){
  collection_name.push(collection)
  //console.log("Collections----: "+collection_name);

  db.close();
  console.log("Collections----: "+collection_name)

});

  });

});

router.get('/latest_data', (req, res)=>{

  MongoClient.connect(url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
  }, function(err, db) {
  if (err) throw err;
  var mydatabase = db.db("demo_db");
  mydatabase.listCollections().toArray(function (err, collection){

  all_collections.push(collection)
  db.close();
});

});

});

module.exports = router;
