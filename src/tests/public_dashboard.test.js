import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import Welcome_page from '../welcome_page.js';

import Scale from '../public_files/scale.js';
import Stats from '../public_files/stats.js';
import Contacts from '../public_files/contacts.js';
import Location_middleware from '../public_files/location_middleware.js';

it ("Welcome Page renders", ()=>{
  const page_div = document.createElement("div");
  ReactDOM.render(<Welcome_page/>, page_div)
})

it ("Scale page renders", ()=>{
  const scale_div = document.createElement("div");
  ReactDOM.render(<Scale/>, scale_div)
})

it ("Contacts page renders", ()=>{
  const contacts_div = document.createElement("div");
  ReactDOM.render(<Contacts/>, contacts_div)
})

it ("Location Page renders", ()=>{
  const loc_div = document.createElement("div");
  ReactDOM.render(<Location_middleware/>, loc_div)
})

it ("Statistics Page renders", ()=>{
  const stats_div = document.createElement("div");
  ReactDOM.render(<Stats/>, stats_div)
})
