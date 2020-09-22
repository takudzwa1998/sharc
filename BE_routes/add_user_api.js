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

router.post('/add', (req, res)=>{
  const saltRounds= 10;
  // Store hash in your password DB.
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(req.body.password, salt)
  console.log(hash)

  if (!req.body.checkbox_state){
    var user_creds={
      name:req.body.name,
      surname:req.body.surname,
      rid:req.body.researcher_id,
      password:hash,
      institution:req.body.institution
    }
  }
  else{
    var user_creds={
      name:req.body.name,
      surname:req.body.surname,
      rid:req.body.researcher_id,
      password:hash,
      institution:''
    }
  }

  MongoClient.connect(url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
  }, function(err, db) {
  if (err) throw err;
    var mydb = db.db("users");
    mydb.collection("registered_users").insertOne(user_creds, function(err, res) {
      if (err) throw err;
      console.log("User Entry Saved");
      db.close();
    });
});


});

router.post('/remove', (req, res)=>{

  MongoClient.connect(url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
  } ,function(err, db) {
    if (err) throw err;
    var mydb = db.db("users");
    var myquery = { name: req.body.name, surname:req.body.surname, institution:req.body.institution, rid:req.body.researcher_id};
    mydb.collection("registered_users").deleteOne(myquery, function(err, obj) {
      if (err) throw err;
      console.log("User "+req.body.name+" "+ req.body.surname+" removed.");
      db.close();
    });
  });

});

module.exports = router;