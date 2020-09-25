import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Buoy_Form from './buoy_form.js';
import Add_User from './add_user.js';
import Dropdown_Menu from './dropdown_menu.js';
import Extract_page from './extract_page.js';
import Admin_Login from './login_components/admin_login.js'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import ProtectedRoute from "./login_components/ProtectedRoute";
import Dashboard from "./admin/dashboard.js";

class App extends React.Component{

  render(){
    return(
      <div>
      <Router>

        <Route path='/Admin_Login'>
        <Admin_Login/>
        </Route>

        <ProtectedRoute path="/dashboard">
          <Dashboard/>
        </ProtectedRoute>

      </Router>
      </div>
    );
  }


}

export default App;
