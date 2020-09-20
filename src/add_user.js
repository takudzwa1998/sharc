import React, {Component} from 'react';
import axios from "axios";
import Dropdown_Menu from './dropdown_menu.js';
import Dropdown from 'react-dropdown';

import { connect, Provider } from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateInstitution} from './actions/user.js';
const options = [
  'Antarctic Legacy','Cape Peninsula University of Technology',
   'CNRS',
  'CSIR','Florida State University',
  'LOCEAN','Nelson Mandela Metropolitan University',
  'Republic of South Africa Environmental Affairs',
  'SOCCO','South African Weather Service',
  'Stellenbosch University','University of Cape Town',
  'University of Bristol','University of Gothenburg',
  'University of Pretoria','University of Tasmania',
  'University of the Western Cape'
];

class Add_User extends React.Component{
  constructor(props){
  super(props);
  this._onSelect = this._onSelect.bind(this)
}
  state={
    name:'',
    surname:'',
    researcher_id:'',
    param2:'',
    password:'',
    selected: ''
  };

_onSelect (option) {
  console.log('You selected ', option.label)
  this.setState({selected: option})
}

  render(){
    const selected_Institution = typeof this.state.selected === 'string' ? this.state.selected : this.state.selected.label
    return(
      <div className="form-input">
      <h2>{this.state.selected.label}</h2>
      <h2>Sample Add User Form</h2>
          <form >
              <div>
              <input
                type="text"
                name="name"
                placeholder= "Name"
              />
              <input
                type="text"
                name="surname"
                placeholder= "Surname"
              />
              <input
                type="text"
                name="researcher_id"
                placeholder= "Researcher ID"
              />
              <input
                type="text"
                name="password"
                placeholder= "Password"
              />
              <div className="form-input">
                <Dropdown options={options} onChange={this._onSelect} placeholder="Select Institution" />
              </div>
              </div>
            <button>Submit</button>
          </form>
      </div>

    );
  }
}

export default Add_User
