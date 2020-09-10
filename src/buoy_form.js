import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios";


class Buoy_Form extends React.Component{

  state={
    buoy_tag:''
  };

  stateChange=(event)=>{
    const new_buoy = event.target;
    const name = new_buoy.name;
    const value = new_buoy.value;

  this.setState({
    [name]: value
  });

  };

  submit=(event)=>{
    event.preventDefault();

    const load ={
      buoy_tag:this.state.buoy_tag
    };

    axios({
      url:'/api/save',
      method:'POST',
      data: load
    })
     .then(()=>{
       console.log("data sent");
     })
     .catch(()=>{
       console.log("data not sent");
     });;

  };

  render(){
    console.log("State", this.state.buoy_tag);
    return(
      <div className="form-input">
      <h2>Qwerty Keyboard is the best</h2>
          <form onSubmit={this.submit}>
              <div>
              <input
                type="text"
                name="buoy_tag"
                placeholder= "Bouy Name"
                value={this.state.buoy_tag}
                onChange={this.stateChange}
              />
              </div>
            <button>Submit</button>
          </form>

      </div>
    );
  }


}

export default Buoy_Form;
