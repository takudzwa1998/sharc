import React from 'react';
import { Redirect } from "react-router-dom";
import Buoy_Form from "../../buoy_form.js";

class Buoys extends React.Component{

  render(){
    return(
      <div>
      <h2>Manage Buoys</h2>
      <Buoy_Form/>
      </div>
    );

  }
}

export default Buoys;
