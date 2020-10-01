import React from 'react';
import Add_User from "../../add_user.js";
import { withRouter } from "react-router";
class Users extends React.Component{

  render(){
    return(
      <div>
      <h2>My Buoys Users</h2>
      <Add_User/>
      </div>
    );

  }
}

export default withRouter(Users);
