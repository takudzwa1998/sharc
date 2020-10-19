import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import Welcome_page from '../welcome_page.js';

import Scale from '../public_files/scale.js';
import Stats from '../public_files/stats.js';
import Contacts from '../public_files/contacts.js';
import Location_middleware from '../public_files/location_middleware.js';

import Area_graph from '../public_files/area_graph.js';
import Line_graph from '../public_files/line_graph.js';
import P_graph from '../public_files/p_graph.js';
import WS_graph from '../public_files/ws_graph.js';

it ("Welcome Page renders", ()=>{
  const page_div = document.createElement("div");
  ReactDOM.render(<Welcome_page/>, page_div)
})

it ("Scale renders", ()=>{
  const scale_div = document.createElement("div");
  ReactDOM.render(<Scale/>, scale_div)
})

it ("Contacts renders", ()=>{
  const contacts_div = document.createElement("div");
  ReactDOM.render(<Contacts/>, contacts_div)
})

it ("Location Middleware renders", ()=>{
  const loc_div = document.createElement("div");
  ReactDOM.render(<Location_middleware/>, loc_div)
})
