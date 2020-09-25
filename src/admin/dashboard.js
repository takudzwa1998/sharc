import React, {Component} from 'react';
import axios from "axios";
import { Redirect, Switch, Route, Link } from "react-router-dom";
import { withRouter } from "react-router";
import Sidebar from "react-sidebar";

class Dashboard extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      islogout: false,
      sidebarOpen: false
    };
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  onSetSidebarOpen(open) {
  this.setState({ sidebarOpen: open });
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

      <h2>Dashboard</h2>
      <h2>Dashboard</h2>
      <Sidebar
          sidebar={
            <button>A whole bunch of links </button>
                  }
          open={this.state.sidebarOpen}
          onSetOpen={this.onSetSidebarOpen}
          styles={{ sidebar: { background: "white" } }}
        >
          <button onClick={() => this.onSetSidebarOpen(true)}>
            Open sidebar
          </button>
      </Sidebar>
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
