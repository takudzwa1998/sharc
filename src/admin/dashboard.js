//****************************************************************************************************************************//
//                Dashboard Page
//Signout token code[lines 32-37] by: Sigit Prasetya Nugroho, https://seegatesite.com/implement-login-page-and-protected-route-reactjs/
//Code modified by: Takudzwa Shumbamhini
//****************************************************************************************************************************//

import React, {Component} from 'react';
import axios from "axios";
import { Redirect, Switch, Route, Link } from "react-router-dom";
import { withRouter } from "react-router";
import Sidebar from "react-sidebar";

/**
*router component for Dashboard
*@class Dashboard {
  constructor() {
    super(props);
    this.state = {
      islogout: false
    };
  }
}
*/

class Dashboard extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      islogout: false
    };
}

  signOut = () => {
    localStorage.removeItem("token");
    this.setState({
      islogout: true
    });
  };

  render(){
    if (this.state.islogout) {
      return <Redirect to="/Admin_login" />;
    }
    return(
      <div>
      <li className="push-right">
        <button onClick={this.signOut} href="#">
          Sign Out
        </button>
      </li>
      </div>
    );
  }
}

export default withRouter(Dashboard);
