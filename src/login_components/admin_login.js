import React, {Component} from 'react';
import '../App.css';
import axios from "axios";
import background_image from '../images/image_background.jpg';
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { useHistory } from 'react-router-dom';
import { Redirect } from "react-router-dom";

class Admin_Login extends React.Component{
  constructor(props){
  super(props);
}

  state={
    password:'',
    rid:'',
    isLogged: false
  };

submit=(event)=>{
  event.preventDefault();
  const load = {
    rid:this.state.rid,
    password:this.state.password
  }

  axios.post('/access/login', load)
.then( (res)=>{
  console.log("POST METHOD");
  if(res){
    console.log("Where is the data "+res.data);
    if (res.data == true){
      console.log("Login Success");
      localStorage.setItem("token", "T");
      this.setState({islogged: true});
    }
  }
  })
  .catch(function (error) {
      console.log(error);
    });

  /*axios({
    url:'/access/login',
    method:'POST',
    data: load
  })
   .then((res)=>{
     console.log("Password is okay");
     console.log("Response is "+res.response);
     res.end();
   })
   .catch(()=>{
     console.log("data not sent");
   });;*/

};

  stateChange=({target})=>{
    const {name, value}=target;
    this.setState({[name]: value});
  };

  render(){
    if (localStorage.getItem("token")) {
      return <Redirect to="/dashboard" />;
    }
    return(
      <div className="Login">
      <h2>Admin Login Page</h2>
      <form onSubmit={this.submit} >
      <input
        type="text"
        name="rid"
        placeholder= "Researcher ID"
        value={this.state.rid}
        onChange={this.stateChange}
      />
      <input
        type="password"
        name="password"
        placeholder= "Password"
        value={this.state.password}
        onChange={this.stateChange}
      />
      <button>Login</button>
      </form>
      </div>

    );
  }


}

export default Admin_Login;
