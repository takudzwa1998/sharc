import React from 'react';
import Extract_page from '../../extract_page.js';
import '../../App.css';
import Stats from '../../public_files/stats.js';
import Graphs from '../../public_files/graphs.js';

class Analytics extends React.Component{

  render(){
    return(
      <div>
      <h2>My Buoys Analytics</h2>
      <Extract_page/>
      <Graphs/>
      </div>
    );

  }
}

export default Analytics;
