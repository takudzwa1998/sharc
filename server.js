//server.js file

//These are thr packages needed for our web application
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const Path = require('path');
const multer = require('multer');
//initialise our express application
const app = express();
var fs = require('fs');
var csv = require("csv-parser");
//define our port
//use port 8080, otherwise use deployer port
const PORT = process.env.PORT || 8080;

//define routes
const routes = require('./BE_routes/api.js');
const add_user = require('./BE_routes/add_user_api.js');
const extract_data = require('./BE_routes/extract_data.js');
const login_api = require('./BE_routes/login_api.js');
const fetch_api = require('./BE_routes/fetch_api.js');
const public_api = require('./BE_routes/public_api.js');

const csvFilePath='C:/Users/takudzwa shumbamhini/OneDrive/Documents/FINAL_YEAR/2nd_Semester/EEE4022S/sharc/SB_03.csv';
//connect to mongo

mongoose.connect('mongodb://localhost:27017/demo_db',{
  useNewUrlParser:true,
  useUnifiedTopology:true
});

mongoose.connection.on('connected',()=>{
  console.log('Mongo DB Connected Successfully xD');
});

var MongoClient  = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

//making requests available on request.body
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//morgan package logs http requests
//for us to see what routes we are at
app.use(morgan('tiny'));
app.use('/api', routes);
app.use('/add_user', add_user);
app.use('/extract_data', extract_data);
app.use('/access', login_api);
app.use('/fetch', fetch_api);
app.use('/public_api', public_api);
app.use(express.static(__dirname+'\\BE_routes\\buoy_data_files'))

const dest = 'BE_routes\\buoy_data_files\\';
var file_name = ''
const storage = multer.diskStorage({
  destination: function (req, file, cb){
    cb(null, dest)
  },
  filename: function(req, file, cb){
    cb(null, file.originalname);
    file_name=file.originalname;
  }
})

function add_to_database(collection, data){

  MongoClient.connect(url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
  }, function(err, db) {
  if (err) throw err;
    var mydb = db.db("demo_db");
    mydb.collection(collection).insertOne(data, function(err, res) {
      if (err) throw err;
      console.log(data)
      db.close();
    });
});

}

app.post('/data_file_upload', (req, res)=>{
  let data_load=multer({storage: storage} ).single('data_file');
  data_load(req, res, function(err) {
    if (err){console.log(err);}
    const path = Path.join(__dirname+'\\BE_routes\\buoy_data_files\\'+file_name)
    const collection = file_name.slice(0, -4)
    console.log("File name 1: "+collection)
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
    });

  });


  res.end()
})

app.listen(PORT, console.log(`Server is starting at ${PORT}`))
