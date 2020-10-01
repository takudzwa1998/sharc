import React from 'react';
import Extract_page from '../../extract_page.js';
import '../../App.css';
import Stats from '../../public_files/stats.js';

class Analytics extends React.Component{

  render(){
    return(
      <div>
      <h2>My Buoys Analytics</h2>
      <Extract_page/>
      <Stats/>
      </div>
    );

  }
}

export default Analytics;
