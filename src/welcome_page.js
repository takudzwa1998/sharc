import React, {Component} from 'react';
import './App.css';
import Landing_page from "./public_files/landing_page.js";
import Location from "./public_files/location.js";
import Location_middleware from "./public_files/location_middleware.js";
import Contacts from "./public_files/contacts.js";
import Stats from "./public_files/stats.js";
import Scale from "./public_files/scale.js";
import sc from './images/sc.png';
import Footer from './footer.js'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect, Link
} from "react-router-dom";
var start = Date.now();

class Welcome_page extends React.Component{

  render(){
  return(
    <div data-testid="welcome_page">
    <img src={sc}/>
    <Router >
    <nav >
    <ul className="ul">
    <Link to="/" ><li className="ul-li">SCALE</li></Link>
    <Link to="/locations" ><li className="ul-li">LOCATIONS</li></Link>
    <Link to="/contact" ><li className="ul-li"> CONTACTS</li></Link>
    <Link to="/stats" ><li className="ul-li">STATISTICS</li></Link>
    </ul>
    </nav>
    <Switch>
      <Route exact path="/" component={Scale} />
      <Route path="/locations" component={Location_middleware} />
      <Route path="/contact" component={Contacts} />
      <Route path="/stats" component={Stats} />
    </Switch>
    </Router>
    <Footer/>
    </div>
  );
  }
}

export default Welcome_page;
