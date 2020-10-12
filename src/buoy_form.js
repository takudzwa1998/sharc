import React,{Component, useState} from 'react';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import './App.css';
import axios from "axios";
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Popup from 'reactjs-popup';
import ReactNotifications from 'react-notifications-component';
import { store } from 'react-notifications-component';
var _ = require('underscore');
var buoys_array = []



class Buoy_Form extends React.Component{

  constructor(props){
    super(props);
    this.state={
      number_of_buoys:null,
      col_data:null,
      all_users:null,
      latest_set:null
    }
  }

  componentWillMount(){
    axios.get('/fetch/buoys')
     .then( response=>
       //console.log("Response Data 1: "+response.data[0]["name"])
       this.setState({number_of_buoys:response.data})
     )
     .catch((error)=>{
       console.log(error);
     });;

     axios.get('/fetch/latest_data')
      .catch((error)=>{
        console.log(error);
      });;


  }

  state={
    buoy_tag:'',
    rockblock_link:'',
    param1:'',
    param2:'',
    param3:'',
    param4:'',
    gps_location:'',
    checkbox_state:false
  };

  stateChange=({target})=>{
    console.log(target.value);
    const {name, value}=target;
    this.setState({[name]: value});
  };

  handleCheckBoxChange=()=>{
    this.setState({checkbox_state:!this.state.checkbox_state});
  };

  submit=(event)=>{
    event.preventDefault();

    const load ={
      buoy_tag:this.state.buoy_tag,
      rockblock_link:this.state.rockblock_link,
      param1:this.state.param1,
      param2:this.state.param2,
      param3:this.state.param3,
      param4:this.state.param4,
      gps_location:this.state.gps_location,
      checkbox_state:this.state.checkbox_state
    };

    axios({
      url:'/api/save_buoy',
      method:'POST',
      data: load
    })
     .then((response)=>{
       console.log(response.data);

       store.addNotification({
         title: 'Notification',
         message: 'Buoy Successfully saved',
         type: 'default',                         // 'default', 'success', 'info', 'warning'
         container: 'center',                // where to position the notifications
         animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
         animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
         dismiss: {
           duration: 3000
         }
       })

       this.resetInputFields();
     })
     .catch(()=>{
       console.log("data not sent");
     });;

  };

  take_data(col_name){
    const load={
      name: col_name
    }
    axios({
      url:'/fetch/col_data',
      method:'POST',
      data:load
    })
     .then(response=>
       this.setState({col_data:response.data})
     )
     .catch(()=>{
       console.log("data not received");
     });;
     store.addNotification({
       title: '',
       message: 'Data saved to your Downloads Folder',
       type: 'default',                         // 'default', 'success', 'info', 'warning'
       container: 'center',                // where to position the notifications
       animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
       animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
       dismiss: {
         duration: 3000
       }
     })
  }

  delete=(event)=>{
    event.preventDefault();

    const load ={
      buoy_tag:this.state.buoy_tag,
      checkbox_state:this.state.checkbox_state
    };
    axios({
      url:'/api/remove_buoy',
      method:'POST',
      data: load
    })
     .then((response)=>{
       console.log(response.data);

       store.addNotification({
         title: 'Notification',
         message: 'Buoy Successfully Deleted',
         type: 'default',                         // 'default', 'success', 'info', 'warning'
         container: 'center',                // where to position the notifications
         animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
         animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
         dismiss: {
           duration: 3000
         }
       })

       this.resetInputFields();
     })
     .catch(()=>{
       console.log("Error, Buoy not deleted");
     });;


  };

  resetInputFields=()=>{
    this.setState({
      buoy_tag:'',
      rockblock_link:'',
      param1:'',
      param2:'',
      param3:'',
      param4:'',
      gps_location:''
    });
  };

  createNotification = (type) => {
    return () => {
      switch (type) {
        case 'info':
          NotificationManager.info('Info message');
          break;
        case 'success':
          NotificationManager.success('Success message', 'Title here');
          break;
        case 'warning':
          NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
          break;
        case 'error':
          NotificationManager.error('Error message', 'Click me!', 5000, () => {
            alert('callback');
          });
          break;
      }
    };
  };

  render(){
    buoys_array=this.state.number_of_buoys
    if(buoys_array){
    var headings=["name","Last Logged Location", "Date", "Battery Voltage"];
      return(
<div>
  <Popup trigger={<button className="popup-button">Detach Buoy</button>}
  modal
  >
  <ReactNotifications />
  <form onSubmit={this.delete} >
      <div className="form-input">
      <MuiThemeProvider>
      <TextField
        type="text"
        name="buoy_tag"
        placeholder= "Bouy Name"
        value={this.state.buoy_tag}
        onChange={this.stateChange}
      />
      </MuiThemeProvider>
      Also Delete the data from this buoy
      <input
        type="checkbox"
        name="checkbox_state"
        value={this.state.checkbox_state}
        onChange={this.handleCheckBoxChange}
      />
      </div>
    <button>Submit</button>
  </form>

  </Popup>
<h2>" "</h2>
      <Popup trigger={<button className="popup-button"> Attach New Buoy</button>}
      modal
      >
      <ReactNotifications />
          <form onSubmit={this.submit} >
              <div className="form-input">
              <MuiThemeProvider>
              <TextField
                type="text"
                name="buoy_tag"
                placeholder= "Bouy Name"
                value={this.state.buoy_tag}
                onChange={this.stateChange}
              />
              <TextField
                type="text"
                name="rockblock_link"
                placeholder= "RockBlock Link"
                value={this.state.rockblock_link}
                onChange={this.stateChange}
              />
              <TextField
                type="text"
                name="param1"
                placeholder= "Parameter One"
                value={this.state.param1}
                onChange={this.stateChange}
              />
              <TextField
                type="text"
                name="param2"
                placeholder= "Parameter Two"
                value={this.state.param2}
                onChange={this.stateChange}
              />
              <TextField
                type="text"
                name="param3"
                placeholder= "Parameter Three"
                value={this.state.param3}
                onChange={this.stateChange}
              />
              <TextField
                type="text"
                name="param4"
                placeholder= "Parameter Four"
                value={this.state.param4}
                onChange={this.stateChange}
              />
              <TextField
                type="text"
                name="gps_location"
                placeholder= "GPS Location"
                value={this.state.gps_location}
                onChange={this.stateChange}
              />
              </MuiThemeProvider>
              </div>
            <button>Submit</button>
          </form>
      </Popup>
      <Tabs>
        <TabList>
        {_.range(0, buoys_array.length, 1).map(value=>
            <Tab>{buoys_array[value]["name"]}</Tab>
        )}

        </TabList>

          {_.range(0,  buoys_array.length, 1).map(value=>
            <TabPanel>
            <ReactNotifications />
            <button onClick={ ()=>{this.take_data(buoys_array[value]["name"]);} }>Download Data</button>
            </TabPanel>
          )}

      </Tabs>

</div>
    );
  }
  else{
    console.log("Render Issues!!!!!!!");
    return(
<div>
<Popup trigger={<button className="popup-button">Detach Buoy</button>}
modal
>
<ReactNotifications />
<form onSubmit={this.delete} >
    <div className="form-input">
    <MuiThemeProvider>
    <TextField
      type="text"
      name="buoy_tag"
      placeholder= "Bouy Name"
      value={this.state.buoy_tag}
      onChange={this.stateChange}
    />
    </MuiThemeProvider>
    Also Delete the data from this buoy
    <input
      type="checkbox"
      name="checkbox_state"
      value={this.state.checkbox_state}
      onChange={this.handleCheckBoxChange}
    />
    </div>
  <button>Submit</button>
</form>

</Popup>
<h2>" "</h2>
    <Popup trigger={<button className="popup-button"> Attach New Buoy</button>}
    modal
    >
    <ReactNotifications />
        <form onSubmit={this.submit} >
            <div className="form-input">
            <MuiThemeProvider>
            <TextField
              type="text"
              name="buoy_tag"
              placeholder= "Bouy Name"
              value={this.state.buoy_tag}
              onChange={this.stateChange}
            />
            <TextField
              type="text"
              name="rockblock_link"
              placeholder= "RockBlock Link"
              value={this.state.rockblock_link}
              onChange={this.stateChange}
            />
            <TextField
              type="text"
              name="param1"
              placeholder= "Parameter One"
              value={this.state.param1}
              onChange={this.stateChange}
            />
            <TextField
              type="text"
              name="param2"
              placeholder= "Parameter Two"
              value={this.state.param2}
              onChange={this.stateChange}
            />
            <TextField
              type="text"
              name="param3"
              placeholder= "Parameter Three"
              value={this.state.param3}
              onChange={this.stateChange}
            />
            <TextField
              type="text"
              name="param4"
              placeholder= "Parameter Four"
              value={this.state.param4}
              onChange={this.stateChange}
            />
            <TextField
              type="text"
              name="gps_location"
              placeholder= "GPS Location"
              value={this.state.gps_location}
              onChange={this.stateChange}
            />
            </MuiThemeProvider>
            </div>
          <button>Submit</button>
        </form>
    </Popup>
</div>
  );
  }
}


}


export default Buoy_Form;
