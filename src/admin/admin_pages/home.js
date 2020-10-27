import React from 'react';
import Dashboard from "../dashboard.js";
import Box from '@material-ui/core/Box';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Timeline } from 'react-twitter-widgets';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import 'react-notifications/lib/notifications.css';
import ReactNotifications from 'react-notifications-component';

import * as ss from 'simple-statistics'
import {mean, max, min, median} from 'simple-statistics'
import Button from '@material-ui/core/Button';

import { shadows } from '@material-ui/system';
import axios from "axios";
var _ = require('underscore');

class Home extends React.Component{

  constructor(props){
    super(props);
    this.state={
      number_of_buoys:null,
      all_users:null,
      current_data:null
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

     axios.get('/fetch/all_users')
      .then( response=>
       this.setState({all_users:response.data, show: true})
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

  render(){
    var buoys_array = this.state.number_of_buoys
    var all_users = this.state.all_users
    if (buoys_array && all_users){
      if(this.state.current_data){
        var my_data = this.state.current_data;
        var vicortyDataSets=[];
        var dataset_length=0;
        var output_data="";
        var inner_set={}

        var keys = Object.keys(my_data[1])
        var allsets=[];

        for (var i=4;i<my_data.length;i++){
          var dataset=[];
          for(var j=0;j<my_data.length;j++){
            var property=keys[i]
            dataset.push(my_data[j][property])
          }
          allsets.push(dataset);
        }
        //console.log("Allsets length: "+allsets.length);
        for (var q=0;q<=allsets.length;q++){
            var dataset_array=[]
            if (allsets[q]){
                for (var r=0;r<=allsets[q].length-1;r++){

                  if ( (q+1)<(allsets.length)){
                      if (parseFloat(allsets[q][r])){
                        var point = parseFloat(allsets[q][r])
                    }
                  dataset_array.push(point)
                }

                }

            }

            inner_set[q]=dataset_array
            if (Object.keys(inner_set[q]).length!=0){
            vicortyDataSets[q]= dataset_array;

          }
      }

      console.log("1: "+vicortyDataSets[1]);
      console.log("2: "+vicortyDataSets[2]);
      console.log("3: "+vicortyDataSets[3]);
      console.log("4: "+vicortyDataSets[4]);
      console.log("5: "+vicortyDataSets[5]);

        return(
          <div>
          <h2 data-testid="home" className="header">Home</h2>
          <Grid container spacing={3}>

            <Grid item xs={8}>
              <Paper className="paper">
              Number of Buoys Attached to the system:
              </Paper>

            </Grid>

            <Grid item xs={4}>
              <Paper className="paper">
              {buoys_array.length}
              </Paper>
            </Grid>

              <Grid item xs={8}>
                <Paper className="paper">
                Total number of users saved in database:
                </Paper>
              </Grid>

              <Grid item xs={4}>
                <Paper className="paper">
                {all_users.length}
                </Paper>


              </Grid>

          </Grid>
          <Tabs>
            <TabList>
            {_.range(0, buoys_array.length, 1).map(value=>
                <Tab>{buoys_array[value]["name"]}</Tab>
            )}

            </TabList>

              {_.range(0,  buoys_array.length, 1).map(value=>
                <TabPanel>
                <Button  variant="contained" color="primary" onClick={() => this.take_data(buoys_array[value]["name"]) }>STATISTICAL SUMMARY OF {buoys_array[value]["name"]}</Button >
                    <div style={{alignItems: "center"}}>
                    <Box width = "40%" boxShadow={1} component="span" display="block" p={1} m={1}>
                      Mean {keys[value+3]}: {parseFloat(mean(vicortyDataSets[1])).toPrecision(4)} | Max {keys[value+3]}: {parseFloat(min(vicortyDataSets[1])).toPrecision(4)}| Min {keys[value+3]}: {parseFloat(max(vicortyDataSets[1])).toPrecision(4)}
                    </Box>
                      <Box width = "40%" boxShadow={1} component="span" display="block" p={1} m={1}>
                        Mean {keys[value+4]}: {parseFloat(mean(vicortyDataSets[2])).toPrecision(4)} | Max {keys[value+4]}: {parseFloat(max(vicortyDataSets[2])).toPrecision(4)}| Min {keys[value+4]}: {parseFloat(min(vicortyDataSets[2])).toPrecision(4)}
                      </Box>
                      <Box width = "40%" boxShadow={1} component="span" display="block" p={1} m={1}>
                      Mean {keys[value+5]}: {parseFloat(mean(vicortyDataSets[3])).toPrecision(4)} | Max {keys[value+5]}: {parseFloat(max(vicortyDataSets[3]))}| Min {keys[value+5]}: {parseFloat(min(vicortyDataSets[3])).toPrecision(4)}
                      </Box>
                      <Box width = "40%" boxShadow={1} component="span" display="block" p={1} m={1}>
                      Mean {keys[value+6]}: {parseFloat(mean(vicortyDataSets[4])).toPrecision(4)} | Max {keys[value+6]}: {parseFloat(max(vicortyDataSets[4])).toPrecision(4)}| Min {keys[value+6]}: {parseFloat(min(vicortyDataSets[4])).toPrecision(4)}
                      </Box>
                      </div>
                <ReactNotifications />
                </TabPanel>
              )}

          </Tabs>
          </div>
        );

      }
      return(
      <div style={{justifyContent: 'center'}}>
      <h2 data-testid="home" className="header">Home</h2>
      <Grid container spacing={3}>

        <Grid item xs={8}>
          <Paper className="paper">
          Number of Buoys Attached to the system:
          </Paper>

        </Grid>

        <Grid item xs={4}>
          <Paper className="paper">
          {buoys_array.length}
          </Paper>
        </Grid>

          <Grid item xs={8}>
            <Paper className="paper">
            Total number of users saved in database:
            </Paper>
          </Grid>

          <Grid item xs={4}>
            <Paper className="paper">
            {all_users.length}
            </Paper>


          </Grid>

      </Grid>

      <Tabs>
        <TabList>
        {_.range(0, buoys_array.length, 1).map(value=>
            <Tab>{buoys_array[value]["name"]}</Tab>
        )}

        </TabList>

          {_.range(0,  buoys_array.length, 1).map(value=>
            <TabPanel>
            <button className="popup-button" onClick={() => this.take_data(buoys_array[value]["name"]) }>Statistical Summary of {buoys_array[value]["name"]}</button>
            <ReactNotifications />
            </TabPanel>
          )}

      </Tabs>

      </div>
    );
    }
    else{
      console.log("Error: Render Issues!" )
    }
    return(
      <h1>Home Page</h1>
    );
  }
}

export default Home;
