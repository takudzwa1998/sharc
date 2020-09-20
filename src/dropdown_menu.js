import React, {Component} from 'react';
import axios from "axios";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { connect,Provider } from 'react-redux';
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

class Dropdown_Menu extends React.Component{
  constructor (props) {
  super(props)
  this.state = {
    selected: ''
  }
  this._onSelect = this._onSelect.bind(this)
}
  _onSelect (option) {
    console.log('You selected ', option.label)
    this.setState({selected: option})
    this.props.updateInstitution(option.label)
  }
  render(){
    const selected_Institution = typeof this.state.selected === 'string' ? this.state.selected : this.state.selected.label
    return(
      <div className="form-input">
        <Dropdown options={options} onChange={this._onSelect} placeholder="Select Institution" />
        <h2>{this.props.user.institution}</h2>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch)=>{
  return bindActionCreators({updateInstitution},dispatch)
}

const mapStateToProps = (state)=>{
  return {
    user: state.user
  }
}

export default connect(mapStateToProps,mapDispatchToProps )(Dropdown_Menu)
