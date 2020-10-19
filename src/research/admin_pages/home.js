import React from 'react';
import Dashboard from "../dashboard.js";
import Box from '@material-ui/core/Box';
import { shadows } from '@material-ui/system';
import axios from "axios";

class Home extends React.Component{

  constructor(props){
    super(props);
    this.state={
      number_of_buoys:null,
      all_users:null
    }
  }

  componentWillMount(){
    axios.get('/fetch/buoys')
     .then( response=>
       this.setState({number_of_buoys:response.data})
     )
     .catch((error)=>{
       console.log(error);
     });;

     axios.get('/fetch/all_users')
      .then( response=>
       this.setState({all_users:response.data, show: true})
       )
      .catch((error)=>{
        console.log(error);
      });;

  }

  render(){
    var buoys_array = this.state.number_of_buoys
    var all_users = this.state.all_users
    if (buoys_array && all_users){
    return(
      <div style={{justifyContent: 'center'}}>
      <h2>Home</h2>
      <Box width = "60%" boxShadow={1} component="span" display="block" p={1} m={1}>
        Number of Buoys Attached to the system: {buoys_array.length}
      </Box>
      <Box width = "60%" boxShadow={1} component="span" display="block" p={1} m={1}>
        Total number of users saved in database: {all_users.length}
      </Box>
      </div>
    );
    }
    else{
      console.log("Error: Render Issues!" )
    }

    return(
      <h1>Home Page</h1>
    );
  }
}

export default Home;
