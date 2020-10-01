import React from 'react';
import axios from "axios";


class Stats extends React.Component {
  state={
    data:[]
  };

  extract=(event)=>{
  axios({
    url:'/fetch/stats',
    method:'GET',
  })
   .then((res)=>{
     var count = res.data.length;
     console.log(count)

      /*for(var i=0;i<count;i++){
        var pair={
          x: res.data[i]["UTC Date Time"],
          y: res.data[i].Temperature
        }
        this.state.data[i]=pair;
      }*/
      console.log(res.data)
   })
   .catch((error)=>{
     console.log(error);
   });;

  }

  render() {
    return (
      <div>
        <h1>Victory Tutorial</h1>
    <button onClick={this.extract}>Take Data from db</button>
      </div>
    );
  }
}

export default Stats;
