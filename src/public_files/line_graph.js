import React from 'react';

import {ComposedChart, Area, Bar, XAxis, YAxis, Tooltip, Legend} from 'recharts';
import axios from "axios";
var _ = require('underscore');

class Line_graph extends React.Component{

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
    var my_data = this.props.sect_data;
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

                  for (var r=0;r<=50;r++){
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
        {_.range(1, 2, 1).map( value =>

        <ComposedChart
          width={1000}
          height={500}
          data={vicortyDataSets[1]}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <XAxis />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area name={keys[4]} type="monotone" dataKey="x" stroke="#8884d8" fill="#8884d8" />
          <Bar name={keys[6]} type="monotone" dataKey="y" stroke="#8884d8" fill="#eee0ff" fillOpacity={.6} />
        </ComposedChart>

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

export default Line_graph;
