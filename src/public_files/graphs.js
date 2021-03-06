//****************************************************************************************************************************//
//                Protected Route
//Graphing code derived from: https://recharts.org/en-US/ , {https://recharts.org/en-US/api/LineChart}
//Code modified by: Takudzwa Shumbamhini
//****************************************************************************************************************************//

import React from 'react';
import axios from "axios";
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
var _ = require('underscore')

/**
*Graphs - line graph for the UI
*@class Graphs -class name
*
*/

class Graphs extends React.Component{

constructor(props){
  super(props);
  this.state={
    rec_data:[]
  }
}

componentWillMount(){
  axios.get('/fetch/stats')
   .then( response=>
     this.setState({rec_data:response.data})
   )
   .catch((error)=>{
     console.log(error);
   });;

}

render(){
  var my_data = this.state.rec_data
  if (my_data[1]){
        var vicortyDataSets=[];
        var dataset_length=0;
        var output_data="";
        var inner_set={}

        var keys = Object.keys(my_data[1])
        var allsets=[];

        for (var i=4;i<my_data.length;i++){
          var dataset=[];
          for(var j=0;j<my_data.length;j++){
            var property=keys[i]
            dataset.push(my_data[j][property])
          }
          allsets.push(dataset);
        }

        for (var q=0;q<=allsets.length;q++){
            var dataset_array=[]

            if (allsets[q]){

                for (var r=0;r<=allsets[q].length;r++){
                  if ( (q+1)<(allsets.length)){
                    if ( parseInt(allsets[0][r]) > 100){
                      ;
                    }
                    else{
                    var point={
                    x: parseInt(allsets[0][r]),
                    y: parseInt(allsets[q+1][r])
                  }
                    }
                  dataset_array.push(point)
                }
                }

            }

            inner_set[q]=dataset_array
            if (Object.keys(inner_set[q]).length!=0){
            vicortyDataSets[q]= dataset_array;

          }
      }

return(

  <div>
      {_.range(0, 5, 1).map( value =>

      <LineChart
        width={1000}
        height={500}
        data={vicortyDataSets[value]}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <XAxis />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line name="Altitude" type="monotone" dataKey="x" stroke="#8884d8" />
        <Line name={keys[value+5]} type="monotone" dataKey="y" stroke="#82ca9d" />
      </LineChart>

      )}

  </div>
  );

  }
  else{
    console.log("Error: Render Issues!" )
  }

return(
  <h1>-</h1>
);

}

}


export default Graphs;
