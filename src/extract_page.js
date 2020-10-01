import axios from "axios";
import './App.css';
import React, {Component} from 'react';
const csvtojson =require("csvtojson");
const csvFilePath='../SB_03.csv';


class Extract_page extends React.Component{

extract=(event)=>{

  axios({
    url:'/extract_data/ext',
    method:'POST',
  })
   .then((res)=>{
     console.log("data sent");
     res.end();
   })
   .catch((error)=>{
     console.log(error);
   });;

}

render(){
  return(
    <div>
    <button className="popup-button" onClick={this.extract}>Extract</button>
    <button className="popup-button" >Extract Individually</button>
    </div>
  );
}

}

export default Extract_page;
