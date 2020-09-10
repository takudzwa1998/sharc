//server.js file

//These are thr packages needed for our web application
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');

//initialise our express application
const app = express();

//define our port
//use port 8080, otherwise use deployer port
const PORT = process.env.PORT || 8080;

//define routes
const routes = require('./BE_routes/api.js');

//connect to mongo

mongoose.connect('mongodb://localhost:27017/demo_db',{
  useNewUrlParser:true,
  useUnifiedTopology:true
});

mongoose.connection.on('connected',()=>{
  console.log('Mongo DB Connected Successfully xD');
});

//making requests available on request.body
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//morgan package logs http requests
//for us to see what routes we are at
app.use(morgan('tiny'));
app.use('/api', routes);

app.listen(PORT, console.log(`Server is starting at ${PORT}`))
