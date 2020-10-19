import React from 'react';
import Extract_page from '../../extract_page.js';
import '../../App.css';
import Graphs from '../../public_files/graphs.js';
import Stats_admin from '../../public_files/stats_admin.js'
import { useHistory } from "react-router-dom";

class Analytics extends React.Component{

  render(){
    return(
      <div>
      <h2>My Buoys Analytics</h2>
      <Extract_page/>
      <Stats_admin/>
      </div>
    );

  }
}

export default Analytics;
