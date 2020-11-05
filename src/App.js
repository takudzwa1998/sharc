import React from 'react';
import './App.css';
import Admin_Login from './login_components/admin_login.js'
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";
import ProtectedRoute from "./login_components/ProtectedRoute";
import Routers from "./admin/routers.js";
import Welcome_page from "./welcome_page.js";

/**
*App - main application component
*@class App -class name
*
*/

class App extends React.Component{

  render(){
    return(
      <div>
      <Router>
        <Route exact path='/Admin_Login'>
        <Admin_Login/>
        </Route>

        <Route exact path='/'>
        <Welcome_page/>
        </Route>

        <ProtectedRoute exact path="/home">
          <Routers/>
        </ProtectedRoute>

      </Router>
      </div>
    );
  }

}

export default App;
