import React from 'react';
import Navigation from './navigation.js';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Buoys from './admin_pages/buoys.js';
import Users from './admin_pages/users.js';
import Home from './admin_pages/home.js';
import Analytics from './admin_pages/analytics.js';
import ProtectedRoute from "../login_components/ProtectedRoute";

function Routers(){
  return(
    <Router>
      <Navigation />
      <Switch>
        <Route exact path='/home' exact component={Home} />
        <Route exact path='/admin_pages/buoys.js' exact component={Buoys} />
        <Route exact path='/admin_pages/users.js' exact component={Users}/>
        <Route exact path='/admin_pages/analytics.js' exact component={Analytics} />
      </Switch>
    </Router>
  )
}

export default Routers;
