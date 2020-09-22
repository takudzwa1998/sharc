import axios from "axios";
import React, {Component} from 'react';
const csvtojson =require("csvtojson");
const csvFilePath='../SB_03.csv';


class Extract_page extends React.Component{

extract=(event)=>{

  axios({
    url:'/extract_data/ext',
    method:'POST',
  })
   .then(()=>{
     console.log("data sent");
   })
   .catch((error)=>{
     console.log(error);
   });;

}
render(){
  return(
    <button onClick={this.extract}>Extract</button>
  );
}

}

export default Extract_page;
