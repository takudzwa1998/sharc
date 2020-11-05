//****************************************************************************************************************************//
//                Contacts Form UI
//All Material UI code adapted from : https://material-ui.com/
//ReactNotifications adapted from npm react-notifications-component, github link{https://github.com/teodosii/react-notifications-component}
//Code modified by: Takudzwa Shumbamhini
//****************************************************************************************************************************//

import React,{Component, useState} from 'react';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Popup from 'reactjs-popup';
import axios from 'axios';
import '../App.css';
import ReactNotifications from 'react-notifications-component';
import { store } from 'react-notifications-component';
import partners from '../images/partners.PNG';
import partners_two from '../images/partners_two.PNG';

/**
*Contacts - Contacts Tab
*@class Contacts -class name
*
*/

class Contacts extends React.Component{

state={
    name:'',
    email:'',
    subject:'',
    message:'',
    password:''
  };

stateChange=({target})=>{
    console.log(target.value);
    const {name, value}=target;
    this.setState({[name]: value});
  };

send_mail=(event)=>{
  event.preventDefault();
  const load={
    name: this.state.name,
    email: this.state.email,
    subject: this.state.subject,
    message: this.state.message,
    password: this.state.password
  }

  axios({
    url: '/api/send_mail',
    method: 'POST',
    data: load
  })
  .then((response)=>{
    this.resetInputFields();
    console.log("Front end: "+response);
    store.addNotification({
      title: 'Notification',
      message: 'Email sent, thank you so much',
      type: 'default',                         // 'default', 'success', 'info', 'warning'
      container: 'center',                // where to position the notifications
      animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
      animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
      dismiss: {
        duration: 3000
      }
    });

  })
  .catch(()=>{
    console.log("Email not sent");
  });;
};

resetInputFields=()=>{
  this.setState({
    name:'',
    email:'',
    subject:'',
    message:'',
    password:''
  })
};

  render(){
    return(
      <form onSubmit={this.send_mail}  >
          <p>Contact Us: shmtak004@myuct.ac.za</p>
          <div className="form-input">
          <MuiThemeProvider>
          <TextField
            type="text"
            name="name"
            data-testid="buoy_tag"
            placeholder= "Name"
            value={this.state.name}
            onChange={this.stateChange}
          />
          <TextField
            type="text"
            name="email"
            data-testid="buoy_link"
            placeholder= "email"
            value={this.state.email}
            onChange={this.stateChange}
          />
          <TextField
            type="text"
            name="subject"
            data-testid="param1"
            placeholder= "Subject"
            value={this.state.subject}
            onChange={this.stateChange}
          />
          <TextField
            type="password"
            name="password"
            placeholder= "password"
            value={this.state.password}
            onChange={this.stateChange}
          />
          <TextField
            type="text"
            name="message"
            value={this.state.message}
            onChange={this.stateChange}
            multiline
            rows={4}
            placeholder= "message"
            variant="outlined"
          />
          </MuiThemeProvider>
          <button className="popup-button">Submit</button>
          </div>
          <img src={partners}/>
          <img src={partners_two}/>
      </form>

    );
  }
}

export default Contacts;
