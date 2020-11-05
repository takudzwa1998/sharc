//****************************************************************************************************************************//
//                Extract UI Page
//All Material UI code adapted from : https://material-ui.com/
//Lines 42-45, 81-86, adapted from  Esterling Accime, github link: {https://github.com/accimeesterlin/mernapp_youtube}
//ReactNotifications{Lines 61-70}, adapted from npm react-notifications-component, github link{https://github.com/teodosii/react-notifications-component}
//Code modified by: Takudzwa Shumbamhini
//****************************************************************************************************************************//

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
var inc=0;

/**
*Extract_page - page for raw data extraction
*@class Extract_page -class name
*
*/

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
      <input type="submit" name="btn_upload_csv_file" value="Upload" className="popup-button"/>
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
