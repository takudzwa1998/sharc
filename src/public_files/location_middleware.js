import React from 'react';
import '../App.css';
import 'react-tabs/style/react-tabs.css';
import 'react-notifications/lib/notifications.css';

import Location from "./location.js";
import axios from "axios";
var _ = require('underscore');
var buoys_array = []
var tracker_data = null

const data = [
  {sourcePosition: [18.4696163, -33.9471633], targetPosition: [18.4739513, -33.953786]}
];

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
              console.log(point)
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
        {_.range(0, buoys_array.length, 1).map(value=>
          <button className="popup-button"  onClick={ ()=>{this.tracker_data(buoys_array[value]["name"]);} }>{buoys_array[value]["name"]}</button>
        )}
      <h2>Our Buoys Bla bla bla</h2>
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
