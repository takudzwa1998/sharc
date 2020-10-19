import React, {Component} from 'react';
import axios from "axios";
import { Redirect, Switch, Route, Link } from "react-router-dom";
import { withRouter } from "react-router";
import Sidebar from "react-sidebar";

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
