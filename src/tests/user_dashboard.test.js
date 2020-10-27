import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { withRouter } from "react-router";
import {Route, Switch} from "react-router-dom";
import { BrowserRouter } from 'react-router-dom';
import Dashboard from '../admin/dashboard.js';
import Navigation from '../admin/navigation.js';

import Analytics from '../admin/admin_pages/analytics.js';
import Buoys from '../admin/admin_pages/buoys.js';
import Home from '../admin/admin_pages/home.js';
import Users from '../admin/admin_pages/users.js';


it ("User Dashboard renders", ()=>{
  const dash_div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <Dashboard/>
    </BrowserRouter>, dash_div)
})

it ("User Sidebar navigation renders", ()=>{
  const sidebar_div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <Navigation/>
    </BrowserRouter>
    , sidebar_div)
})

it ("User Analytics renders", ()=>{
  const analytics_div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <Analytics/>
    </BrowserRouter>
    , analytics_div)
})

it ("User Buoys renders", ()=>{
  const buoys_div = document.createElement("div");
  ReactDOM.render(<Buoys/>, buoys_div)
})

it ("User Home renders", ()=>{
  const home_div = document.createElement("div");
  ReactDOM.render(<Home/>, home_div)
})

it ("User Users renders", ()=>{
  const users_div = document.createElement("div");
  ReactDOM.render(<Users/>, users_div)
})
