import React, {Component} from 'react';
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
  Redirect, Link
} from "react-router-dom";
import ProtectedRoute from "./login_components/ProtectedRoute";
import Dashboard from "./admin/dashboard.js";
import Routers from "./admin/routers.js";
import Buoys from "./admin/admin_pages/buoys.js";

import Landing_page from "./public_files/landing_page.js";
import Location from "./public_files/location.js";
import Location_middleware from "./public_files/location_middleware.js";
import Contacts from "./public_files/contacts.js";
import Stats from "./public_files/stats.js";

class App extends React.Component{

  render(){
    return(
      <div>
      <Router>
        <Route path='/Admin_Login'>
        <Admin_Login/>
        </Route>

        <ProtectedRoute path="/home">
          <Routers/>
        </ProtectedRoute>
        <nav >
        <ul className="nav-links">
        <Link to="/locations" className="nav-links"><li>Locations</li></Link>
        <Link to="/contact" className="nav-links"><li> Contact</li></Link>
        <Link to="/stats" className="nav-links"><li>Statistics</li></Link>
        </ul>
        </nav>
        <Switch>
          <Route path="/locations" component={Location_middleware} />
          <Route path="/contact" component={Contacts} />
          <Route path="/stats" component={Stats} />
        </Switch>

      </Router>
      </div>
    );
  }


}

export default App;
