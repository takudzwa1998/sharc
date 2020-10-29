import React from 'react';
import axios from "axios";
import Graphs from './graphs.js';
import Area_graph from './area_graph.js';
import Line_graph from './line_graph.js';
import P_graph from './p_graph.js';
import WS_graph from './ws_graph.js';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import { useHistory } from "react-router-dom";
var buoys_array = []
var curr_data = []
var _ = require('underscore');

/**
*Stats - Statistics main page for the public
*@class Stats - class name
*
*/


class Stats extends React.Component {

  constructor(props){
    super(props);
    this.state={
      number_of_buoys:null,
      current_data:null,
      buoy_name:null,
      latest_set:null
    }
  }

  componentWillMount(){
    axios.get('/fetch/buoys')
     .then( response=>
       this.setState({number_of_buoys:response.data})
     )
     .catch((error)=>{
       console.log(error);
     });;
  }

  take_data(name){

    const load={
      buoy_name: name
    }

    axios.post('/fetch/public_stats', load)
     .then( response=>
       this.setState({current_data:response.data})
     )
     .catch((error)=>{
       console.log(error);
     });;

  }

  render() {
    buoys_array=this.state.number_of_buoys
    curr_data = this.state.current_data
    if (buoys_array){
      if (this.state.current_data){
        return(
          <div>
          <button className="button" onClick={() => this.props.history.push("/")} >Back</button>
          <Area_graph sect_data={this.state.current_data}/>
          <Line_graph sect_data={this.state.current_data}/>
          <P_graph sect_data={this.state.current_data}/>
          <WS_graph sect_data={this.state.current_data}/>
          </div>
      );
      }
      else{
        return (
          <div>
          <Grid container spacing={3} className="grid">
                <Grid item xs={12}>
                    <Paper className="paper">
                        This page displays the data obtained from the respective buoys.
                        Each parameter (except pressure) might be displayed on a graph along with another parameter.
                        The graphs emulated on this page are a combination of line graphs, bar graphs and area graphs.
                        The tools will rely on the latest data uploaded to our databases and will extract the relevant
                        information regarding the environmental parameters of that buoy.
                    </Paper>
                </Grid>
          </Grid>
          <Grid container spacing={3} className="grid">
            <Grid item xs={6}>
            <Paper className="paper">
            CLICK BELOW TO VIEW THE BUOY'S MEASURED DATA FROM THE SOUTHERN OCEAN
            </Paper>
            </Grid>
          </Grid>
          <div className="stats-button">
          {_.range(0, buoys_array.length, 1).map(value=>
            <button className="popup-button" onClick={() => this.take_data(buoys_array[value]["name"]) }>{buoys_array[value]["name"]}</button>
          )}
          </div>
        </div>
        );
      }
    }
    else{return(<h2>-</h2>);}

  }

}

export default Stats;
