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

router.post('/tracker_data', (req, res)=>{
  MongoClient.connect(url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
  }, function(err, db) {
  if (err) throw err;
  var mydatabase = db.db("demo_db");
  mydatabase.collection(req.body.name).find({}, {projection: {_id: 0, Latitude: 1,Longitude: 1}}).toArray(function(err, result) {
    if (err) throw err;
    //console.log("Lat: "+ result[0]["Latitude"]+" & Lng "+Object.keys(result[0]))
    var keys = Object.keys(result)
    res.send(result)
    db.close();
  });
  });
});

module.exports = router;
