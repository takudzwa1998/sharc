const express = require('express');

const router = new express.Router();
const Buoy_One = require('../BE_buoy_models/Buoy_One');
var fs = require('fs');
var http = require('http');

//routes
router.post('/save', (req, res)=>{

  fs.appendFile('BE_routes/api.js', 'Beast Coast= '+req.body.buoy_tag+' JOEY BADA$$', function (err,data) {
    if (err) {
      return console.log(err);
    }
    console.log(data);
  });

  console.log("Body: ", req.body.buoy_tag);
  //console.log("Data received: ", res.data);
  res.json({
    msg:"data received"
  })


} );

module.exports = router;
