import axios from "axios";
import './App.css';
import React, {Component} from 'react';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';

import Popup from 'reactjs-popup';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ReactNotifications from 'react-notifications-component';
import { store } from 'react-notifications-component';

const csvtojson =require("csvtojson");
const csvFilePath='../SB_03.csv';
var inc=0;


class Extract_page extends React.Component{

constructor(props){
    super(props);
    this.state={
      which_buoy:null,
      buoy_tag:'',
    }
  }

stateChange=({target})=>{
    const {name, value}=target;
    this.setState({[name]: value});
  };

extract=(event)=>{
event.preventDefault();
  const load={
    tag: this.state.buoy_tag
  }

  axios({
    url:'/extract_data/ext',
    method:'POST',
    data: load
  })
   .then((res)=>{
     console.log("data sent");
     res.end();
     store.addNotification({
       title: 'Notification',
       message: 'Raw data Successfully Extracted',
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
   .catch((error)=>{
     console.log(error);
   });;


}

stateChange=({target})=>{
  const {name, value}=target;
  this.setState({[name]: value});
};

resetInputFields=()=>{
  this.setState({
    buoy_tag:'',
    which_buoy:''
  });
};

render(){
  return(
    <div>
        <Box width = "50%" boxShadow={1} component="span" display="inline-block" p={1} m={1}>
    <h2>Upload data to buoy</h2>
    <form target="_blank" action="/data_file_upload" method="POST" enctype="multipart/form-data">
      <input className="popup-button" type="file" name="data_file" data-testid="file_input"/>
      <input type="submit" name="btn_upload_profile_pic" value="Upload" className="popup-button"/>
    </form>
    <h2>OR</h2>
    <Popup trigger={<button className="popup-button">Extract Raw Data from buoy</button>}
    modal
    >
    <ReactNotifications />
    <form>
      <MuiThemeProvider>
          <TextField
            type="text"
            name="buoy_tag"
            placeholder= "Bouy Name"
            value={this.state.buoy_tag}
            onChange={this.stateChange}
          />
      </MuiThemeProvider>
        <button onClick={this.extract} >Extract</button>
    </form>

    </Popup>
        </Box>
    </div>
  );
}

}

export default Extract_page;
