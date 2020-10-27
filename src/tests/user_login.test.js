import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Admin_Login from '../login_components/admin_login.js';

it ("User Login Page renders", ()=>{
  const admin_div = document.createElement("div");
  ReactDOM.render(<Admin_Login/>, admin_div)
})
