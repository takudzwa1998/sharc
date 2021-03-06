//****************************************************************************************************************************//
//                Navigation Data Page
//Author: Link - https://github.com/briancodex/react-sidebar-v1
//Code modified by: Takudzwa Shumbamhini
//****************************************************************************************************************************//

import React from 'react';
import * as myIcons from "react-icons/fa";
import * as myAIIcons from "react-icons/ai";
import * as myIOIcons from "react-icons/io";
import * as myFIIcons from "react-icons/fi";
import * as mySIIcons from "react-icons/si";

/**
* Defines Admin Tabs
*@returns [Object] Navigation_data - navigation data object
*/

export const Navigation_data=[
  {
    title: 'Home',
    path:'/home',
    icon:<myAIIcons.AiFillHome/>,
    className: 'nav-text'
  },
  {
    title:'Buoys',
    path: '/admin_pages/buoys.js',
    icon: <myFIIcons.FiLifeBuoy/>,
    className: 'nav-text'
  },
  {
    title:'Users',
    path: '/admin_pages/users.js',
    icon: <myIcons.FaUserShield/>,
    className: 'nav-text'
  },
  {
    title:'Analytics',
    path: '/admin_pages/analytics.js',
    icon: <mySIIcons.SiGoogleanalytics/>,
    className: 'nav-text'
  }

]
