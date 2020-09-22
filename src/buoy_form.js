import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios";

class Buoy_Form extends React.Component{

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
     .then(()=>{
       console.log("data sent");
       this.resetInputFields();
     })
     .catch(()=>{
       console.log("data not sent");
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

  render(){
    console.log("State", this.state);
    return(
      <div className="form-input">
      <h2>Sample Buoy Form</h2>
          <form onSubmit={this.submit}>
              <div>
              <input
                type="text"
                name="buoy_tag"
                placeholder= "Bouy Name"
                value={this.state.buoy_tag}
                onChange={this.stateChange}
              />
              <input
                type="text"
                name="rockblock_link"
                placeholder= "RockBlock Link"
                value={this.state.rockblock_link}
                onChange={this.stateChange}
              />
              <input
                type="text"
                name="param1"
                placeholder= "Parameter One"
                value={this.state.param1}
                onChange={this.stateChange}
              />
              <input
                type="text"
                name="param2"
                placeholder= "Parameter Two"
                value={this.state.param2}
                onChange={this.stateChange}
              />
              <input
                type="text"
                name="param3"
                placeholder= "Parameter Three"
                value={this.state.param3}
                onChange={this.stateChange}
              />
              <input
                type="text"
                name="param4"
                placeholder= "Parameter Four"
                value={this.state.param4}
                onChange={this.stateChange}
              />
              <input
                type="text"
                name="gps_location"
                placeholder= "GPS Location"
                value={this.state.gps_location}
                onChange={this.stateChange}
              />
              Also Delete data from this buoy
              <input
                type="checkbox"
                name="checkbox_state"
                value={this.state.checkbox_state}
                onChange={this.handleCheckBoxChange}
              />
              </div>
            <button>Submit</button>
          </form>
      </div>
    );
  }

}

export default Buoy_Form;
