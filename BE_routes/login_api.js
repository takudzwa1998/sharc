//****************************************************************************************************************************//
//                API for Logging in
//All Mongo DB Database functions adapted from : w3schools.com {https://www.w3schools.com/nodejs/nodejs_mongodb_create_db.asp}
//Code modified by: Takudzwa Shumbamhini
//****************************************************************************************************************************//

const express = require('express');
const router = new express.Router();
var prependFile = require('prepend-file');
var fs = require('fs');
var http = require('http');
const mongoose = require('mongoose');

//Database password encryption
const bcrypt= require('bcrypt');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

router.post('/login', (req, res)=>{

  MongoClient.connect(url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
  } , function(err, db) {
    if (err) throw err;
    var dbo = db.db("users");
    var user_rid = req.body.rid;
    dbo.collection("registered_users").findOne({rid: user_rid}, function(err, result) {
      if (err) {console.log(err);}
      else{
        if (result){

      bcrypt.compare(req.body.password, result.password, (err, response)=>{
        if (response){
          console.log("Passwords match, user is clear")
          res.status(200).send(response);}
        else{res.status(200).send(response);}
      })
    }

    }
      db.close();
    });
  });
});

module.exports = router;
