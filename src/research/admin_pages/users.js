import React,{Component, useState} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Add_User from "../../add_user.js";
import { withRouter } from "react-router";
import axios from "axios";
var _ = require('underscore')

const useStyles = makeStyles({table: {minWidth: 650}});

class Users extends React.Component{
  constructor(props){
    super(props);
    this.state={
      user_data:[],
      show: false
    }
    this.showUser=this.showUser.bind(this);
  }

//componentWillMount(){}

showUser(){
  axios.get('/fetch/all_users')
   .then( response=>
    this.setState({user_data:response.data, show: true})
    )
   .catch((error)=>{
     console.log(error);
   });;
}

  render(){
    var users = this.state.user_data
    console.log("Users: "+users)
    if (this.state.show){
      var keys = Object.keys(users[1])
      return(
        <div>
          <Add_User/>
          <TableContainer style={{ width: 1300}} component={Paper}>
          <Table style={{ width: 1300 }} aria-label="simple table">

          <TableHead>
          <TableRow>
          {_.range(0, keys.length, 1).map( value =>
            <TableCell align="right">{keys[value]}</TableCell>
          )}
           </TableRow>
          </TableHead>

          <TableBody>
          {_.range(0, users.length, 1).map( value =>
            <TableRow>
            <TableCell align="right">{users[value]["_id"]}</TableCell>
            <TableCell align="right">{users[value]["name"]}</TableCell>
            <TableCell align="right">{users[value]["surname"]}</TableCell>
            <TableCell align="right">{users[value]["rid"]}</TableCell>
            <TableCell align="right">{users[value]["password"]}</TableCell>
            <TableCell align="right">{users[value]["institution"]}</TableCell>
            </TableRow>
          )}
          </TableBody>

          </Table>
          </TableContainer>
        </div>
      );
    }
    else{
    return(
      <div>
        <h2>My Buoys Users</h2>
        <Add_User/>
        <button onClick={this.showUser} className="popup-button">Show Users</button>
      </div>
    );
    }
  }
}

export default Users;
