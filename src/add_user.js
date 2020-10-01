import React, {Component} from 'react';
import axios from "axios";
import Dropdown_Menu from './dropdown_menu.js';
import Dropdown from 'react-dropdown';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Button from '@material-ui/core/Button';

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
    selected: '',
    checkbox_state:false
  };

_onSelect (option) {
  this.setState({selected: option})
}

stateChange=({target})=>{
  const {name, value}=target;
  this.setState({[name]: value});
};

submit=(event)=>{
    event.preventDefault();

    const load={
      name:this.state.name,
      surname:this.state.surname,
      researcher_id:this.state.researcher_id,
      institution:this.state.selected.label,
      password:this.state.password,
      checkbox_state:this.state.checkbox_state
    };

    axios({
      url:'add_user/add',
      method:'POST',
      data: load
    })
     .then((response)=>{
       console.log(response.data);
       this.resetInputFields();
     })
     .catch(()=>{
       console.log("data not sent");
     });;
};

resetInputFields=()=>{
  this.setState({
    name:'',
    surname:'',
    researcher_id:'',
    password:'',
    selected:''
  });
};

handleCheckBoxChange=()=>{
  this.setState({checkbox_state:!this.state.checkbox_state});
};

  render(){
    const selected_Institution = typeof this.state.selected === 'string' ? this.state.selected : this.state.selected.label
    return(
      <Popup trigger={<button className="popup-button"> Add New User</button>}
      modal
      >
            <form onSubmit={this.submit}>
                <div className="form-input">
                <MuiThemeProvider>
                <TextField
                  type="text"
                  name="name"
                  placeholder= "Name"
                  value={this.state.name}
                  onChange={this.stateChange}
                />
                <TextField
                  type="text"
                  name="surname"
                  placeholder= "Surname"
                  value={this.state.surname}
                  onChange={this.stateChange}
                />
                <TextField
                  type="text"
                  name="researcher_id"
                  placeholder= "Researcher ID"
                  value={this.state.researcher_id}
                  onChange={this.stateChange}
                />
                <TextField
                  type="password"
                  name="password"
                  placeholder= "Password"
                  value={this.state.password}
                  secureTextEntry={true}
                  onChange={this.stateChange}
                />
                <div className="form-input">
                  <Dropdown options={options} onChange={this._onSelect} placeholder="Select Institution" />
                </div>
                No Institution
                <input
                  type="checkbox"
                  name="checkbox_state"
                  value={this.state.checkbox_state}
                  onChange={this.handleCheckBoxChange}
                />
                </MuiThemeProvider>
                <button >Add User</button>
                </div>
            </form>
      </Popup>
    );
  }
}

export default Add_User
