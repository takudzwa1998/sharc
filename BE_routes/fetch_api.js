const express = require('express');
const router = new express.Router();
var prependFile = require('prepend-file');
var fs = require('fs');
var http = require('http');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var MongoClient  = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

router.get('/stats', (req, res)=>{

  MongoClient.connect(url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
  }, function(err, db) {
  if (err) throw err;
  var mydatabase = db.db("demo_db");
  mydatabase.collection("sample_buoy").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result)
    var keys = Object.keys(result)
    res.send(result)
    db.close();
  });
  });

});






module.exports = router;
