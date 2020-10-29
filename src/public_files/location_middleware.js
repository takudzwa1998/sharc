import React from 'react';
import '../App.css';
import 'react-tabs/style/react-tabs.css';
import 'react-notifications/lib/notifications.css';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import buoys from '../images/buoys.jpg';
import Location from "./location.js";
import Box from '@material-ui/core/Box';

import axios from "axios";
var _ = require('underscore');
var buoys_array = []
var tracker_data = null

const data = [
  {sourcePosition: [18.4696163, -33.9471633], targetPosition: [18.4739513, -33.953786]}
];

/**
*Location_middleware - Middleware for processing GPS data
*and rendering UI
*@class Location_middleware -class name
*
*/

class Location_middleware extends React.Component{

  constructor(props){
    super(props);
    this.state={
      number_of_buoys:null,
      tracker_data:null,
      buoy_name:null,
      latest_set:null
    }
  }

  UNSAFE_componentWillMount(){
    axios.get('/fetch/buoys')
     .then( response=>
       this.setState({number_of_buoys:response.data})
     )
     .catch((error)=>{
       console.log(error);
     });;
  }

  tracker_data(name){
    const load={
      name: name
    }
    axios.post('/public_api/tracker_data',load)
     .then( response=>
       this.setState({tracker_data:response.data})
     )
     .catch((error)=>{
       console.log(error);
     });;
  }

  render(){
    buoys_array=this.state.number_of_buoys
    tracker_data = this.state.tracker_data

    if(buoys_array){
      var path = []
      if (tracker_data){
          for (var i = 0; i<=tracker_data.length-1;i++){
            if( (tracker_data[i]["Longitude"]) &&  (tracker_data[i]["Latitude"]) ){
              var point=[ parseFloat(tracker_data[i]["Longitude"]), parseFloat(tracker_data[i]["Latitude"]) ]
              path.push(point);
            }
          }
          return(
            <div>
            <Location data={path}/>
            </div>
          );
        }

      else{return(
      <div>
      <Grid container spacing={3} className="grid">
          <Grid item xs={6}>
              <Paper className="paper">
              The SCALE buoys are deployed at various locations in the Southern Ocean. The current and the ice aid in the navigation of the various buoys.
              Each unit was designed with
              <Box width = "90%" boxShadow={1} component="span" display="block" p={1} m={1}>
                1.	Global Positioning System (GPS) sensors for positional data
              </Box>
              <Box width = "90%" boxShadow={1} component="span" display="block" p={1} m={1}>
                2.	inertial measurement units (IMU)* for wave characteristic collection (wave height, wave period and power spectrum) and
              </Box>
              <Box width = "90%" boxShadow={1} component="span" display="block" p={1} m={1}>
                3.	environmental sensors (temperature, humidity, pressure, wind speed and wind direction).
              </Box>
              </Paper>
          </Grid>
          <Grid item xs={4}>
          <img  width={425} height={425} src={buoys}/>
          </Grid>
      </Grid>
    <Grid container spacing={3} className="grid">
      <Grid item xs={6}>
      <Paper className="paper">
      CLICK BELOW TO VIEW THE BUOY'S TRACKS IN THE SOUTHERN OCEAN
      </Paper>
      </Grid>
    </Grid>
        {_.range(0, buoys_array.length, 1).map(value=>
          <button className="popup-button"  onClick={ ()=>{this.tracker_data(buoys_array[value]["name"]);} }>{buoys_array[value]["name"]}</button>
        )}
      </div>
    );}

    }

    else{
        console.log("Render Issues!!!!!!!");
        return(
          <h2>Awaiting Response</h2>
        );
      }

  }
}

export default Location_middleware;
