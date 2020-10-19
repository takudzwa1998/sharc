import React from 'react';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import 'react-notifications/lib/notifications.css';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import './App.css';
import axios from "axios";
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Popup from 'reactjs-popup';
import ReactNotifications from 'react-notifications-component';
import { store } from 'react-notifications-component';
var _ = require('underscore');
var buoys_array = []
var col_data = []

class Buoy_Form extends React.Component{

  constructor(props){
    super(props);
    this.state={
      number_of_buoys:null,
      col_data:null,
      all_users:null,
      latest_set:null
    }
  }

  componentWillMount(){
    axios.get('/fetch/buoys')
     .then( response=>
       this.setState({number_of_buoys:response.data})
     )
     .catch((error)=>{
       console.log(error);
     });;

     axios.get('/fetch/latest_data')
      .catch((error)=>{
        console.log(error);
      });;


  }

  state={
    buoy_tag:'',
    rockblock_link:'',
    param1:'',
    param2:'',
    param3:'',
    param4:'',
    gps_location:'',
    checkbox_state:false
  };

  stateChange=({target})=>{
    console.log(target.value);
    const {name, value}=target;
    this.setState({[name]: value});
  };

  handleCheckBoxChange=()=>{
    this.setState({checkbox_state:!this.state.checkbox_state});
  };

  submit=(event)=>{
    event.preventDefault();

    const load ={
      buoy_tag:this.state.buoy_tag,
      param1:this.state.param1,
      param2:this.state.param2,
      param3:this.state.param3,
      param4:this.state.param4,
      param5:this.state.param5,
      param6:this.state.param6,
      checkbox_state:this.state.checkbox_state
    };

    axios({
      url:'/api/save_buoy',
      method:'POST',
      data: load
    })
     .then((response)=>{
       console.log(response.data);

       store.addNotification({
         title: 'Notification',
         message: 'Buoy Successfully saved',
         type: 'default',                         // 'default', 'success', 'info', 'warning'
         container: 'center',                // where to position the notifications
         animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
         animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
         dismiss: {
           duration: 3000
         }
       })

       this.resetInputFields();
     })
     .catch(()=>{
       console.log("data not sent");
     });;

  };

  take_data(col_name){
    const load={
      name: col_name
    }
    axios({
      url:'/fetch/col_data',
      method:'POST',
      data:load
    })
     .then(response=>
       console.log("Data saved to local machine")
     )
     .catch(()=>{
       console.log("data not received");
     });;
     store.addNotification({
       title: '',
       message: 'Data saved to your Downloads Folder',
       type: 'default',                         // 'default', 'success', 'info', 'warning'
       container: 'center',                // where to position the notifications
       animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
       animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
       dismiss: {
         duration: 3000
       }
     })
  }

  view(col_name){
    const load={
      name: col_name
    }
    axios({
      url:'/fetch/view_data',
      method:'POST',
      data:load
    })
     .then(response=>
       this.setState({col_data:response.data})
     )
     .catch(()=>{
       console.log("data not received");
     });;
  }

  delete=(event)=>{
    event.preventDefault();

    const load ={
      buoy_tag:this.state.buoy_tag,
      checkbox_state:this.state.checkbox_state
    };
    axios({
      url:'/api/remove_buoy',
      method:'POST',
      data: load
    })
     .then((response)=>{
       console.log(response.data);

       store.addNotification({
         title: 'Notification',
         message: 'Buoy Successfully Deleted',
         type: 'default',                         // 'default', 'success', 'info', 'warning'
         container: 'center',                // where to position the notifications
         animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
         animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
         dismiss: {
           duration: 3000
         }
       })

       this.resetInputFields();
     })
     .catch(()=>{
       console.log("Error, Buoy not deleted");
     });;


  };

  resetInputFields=()=>{
    this.setState({
      buoy_tag:'',
      rockblock_link:'',
      param1:'',
      param2:'',
      param3:'',
      param4:'',
      gps_location:''
    });
  };

  render(){
    buoys_array=this.state.number_of_buoys
    col_data = this.state.col_data
    if(buoys_array){
      if (localStorage.getItem("token") == "SHMTAK004"){
        if (col_data){
            var keys = Object.keys(col_data[1])
          return(
            <div>

              <Popup trigger={<button className="popup-button">Detach Buoy</button>}
              modal
              >
              <ReactNotifications />
              <form onSubmit={this.delete} >
                  <div className="form-input">
                  <MuiThemeProvider>
                  <TextField
                    type="text"
                    name="buoy_tag"
                    placeholder= "Bouy Name"
                    value={this.state.buoy_tag}
                    onChange={this.stateChange}
                  />
                  </MuiThemeProvider>
                  Also Delete the data from this buoy
                  <input
                    type="checkbox"
                    name="checkbox_state"
                    value={this.state.checkbox_state}
                    onChange={this.handleCheckBoxChange}
                  />
                  </div>
                <button>Submit</button>
              </form>

              </Popup>

              <Popup trigger={<button className="popup-button"> Attach New Buoy</button>}
                  modal
                  >
                  <ReactNotifications />
                      <form onSubmit={this.submit} >
                          <div className="form-input">
                          <MuiThemeProvider>
                          <TextField
                            type="text"
                            name="buoy_tag"
                            placeholder= "Bouy Name"
                            value={this.state.buoy_tag}
                            onChange={this.stateChange}
                          />
                          <TextField
                            type="text"
                            name="buoy_link"
                            placeholder= "Rokblock Link"
                            value={this.state.rockblock_link}
                            onChange={this.stateChange}
                          />
                          <TextField
                            type="text"
                            name="param1"
                            placeholder= "Parameter One"
                            value={this.state.param1}
                            onChange={this.stateChange}
                          />
                          <TextField
                            type="text"
                            name="param2"
                            placeholder= "Parameter Two"
                            value={this.state.param2}
                            onChange={this.stateChange}
                          />
                          <TextField
                            type="text"
                            name="param3"
                            placeholder= "Parameter Three"
                            value={this.state.param3}
                            onChange={this.stateChange}
                          />
                          <TextField
                            type="text"
                            name="param4"
                            placeholder= "Parameter Four"
                            value={this.state.param4}
                            onChange={this.stateChange}
                          />
                          <TextField
                            type="text"
                            name="param5"
                            placeholder= "Parameter Five"
                            value={this.state.param5}
                            onChange={this.stateChange}
                          />
                          <TextField
                            type="text"
                            name="param6"
                            placeholder= "Parameter Six"
                            value={this.state.param6}
                            onChange={this.stateChange}
                          />
                          </MuiThemeProvider>
                          </div>
                        <button>Submit</button>
                      </form>
              </Popup>

                  <Tabs>
                    <TabList>
                    {_.range(0, buoys_array.length, 1).map(value=>
                        <Tab>{buoys_array[value]["name"]}</Tab>
                    )}

                    </TabList>

                      {_.range(0,  buoys_array.length, 1).map(value=>
                        <TabPanel>
                        <ReactNotifications />
                        <button onClick={ ()=>{this.take_data(buoys_array[value]["name"]);} }>Download Data</button>
                        <button onClick={()=>{this.view(buoys_array[value]["name"]);}}>View Data</button>
                        </TabPanel>
                      )}

                  </Tabs>

                  <TableContainer style={{ width: 1300}} component={Paper}>
                  <Table style={{ width: 1300 }} aria-label="simple table">

                  <TableHead>
                  <TableRow>
                  {_.range(1, keys.length, 1).map( value =>
                    <TableCell align="right">{keys[value]}</TableCell>
                  )}
                   </TableRow>
                  </TableHead>

                  <TableBody>
                  {_.range(0, col_data.length, 1).map( value =>
                    <TableRow>
                    <TableCell align="right">{col_data[value][keys[1]]}</TableCell>
                    <TableCell align="right">{col_data[value][keys[2]]}</TableCell>
                    <TableCell align="right">{col_data[value][keys[3]]}</TableCell>
                    <TableCell align="right">{col_data[value][keys[4]]}</TableCell>
                    <TableCell align="right">{col_data[value][keys[5]]}</TableCell>
                    <TableCell align="right">{col_data[value][keys[6]]}</TableCell>
                    <TableCell align="right">{col_data[value][keys[7]]}</TableCell>
                    <TableCell align="right">{col_data[value][keys[8]]}</TableCell>
                    <TableCell align="right">{col_data[value][keys[9]]}</TableCell>
                    </TableRow>
                  )}
                  </TableBody>

                  </Table>
                  </TableContainer>

            </div>
        );
        }
        else{
          return(
          <div>

            <Popup trigger={<button className="popup-button">Detach Buoy</button>}
            modal
            >
            <ReactNotifications />
            <form onSubmit={this.delete} >
                <div className="form-input">
                <MuiThemeProvider>
                <TextField
                  type="text"
                  name="buoy_tag"
                  placeholder= "Bouy Name"
                  value={this.state.buoy_tag}
                  onChange={this.stateChange}
                />
                </MuiThemeProvider>
                Also Delete the data from this buoy
                <input
                  type="checkbox"
                  name="checkbox_state"
                  value={this.state.checkbox_state}
                  onChange={this.handleCheckBoxChange}
                />
                </div>
              <button>Submit</button>
            </form>

            </Popup>

            <Popup trigger={<button className="popup-button"> Attach New Buoy</button>}
                modal
                >
                <ReactNotifications />
                    <form onSubmit={this.submit} >
                        <div className="form-input">
                        <MuiThemeProvider>
                        <TextField
                          type="text"
                          name="buoy_tag"
                          placeholder= "Bouy Name"
                          value={this.state.buoy_tag}
                          onChange={this.stateChange}
                        />
                        <TextField
                          type="text"
                          name="buoy_link"
                          placeholder= "Rokblock Link"
                          value={this.state.rockblock_link}
                          onChange={this.stateChange}
                        />
                        <TextField
                          type="text"
                          name="param1"
                          placeholder= "Parameter One"
                          value={this.state.param1}
                          onChange={this.stateChange}
                        />
                        <TextField
                          type="text"
                          name="param2"
                          placeholder= "Parameter Two"
                          value={this.state.param2}
                          onChange={this.stateChange}
                        />
                        <TextField
                          type="text"
                          name="param3"
                          placeholder= "Parameter Three"
                          value={this.state.param3}
                          onChange={this.stateChange}
                        />
                        <TextField
                          type="text"
                          name="param4"
                          placeholder= "Parameter Four"
                          value={this.state.param4}
                          onChange={this.stateChange}
                        />
                        <TextField
                          type="text"
                          name="param5"
                          placeholder= "Parameter Five"
                          value={this.state.param5}
                          onChange={this.stateChange}
                        />
                        <TextField
                          type="text"
                          name="param6"
                          placeholder= "Parameter Six"
                          value={this.state.param6}
                          onChange={this.stateChange}
                        />
                        </MuiThemeProvider>
                        </div>
                      <button>Submit</button>
                    </form>
            </Popup>

                <Tabs>
                  <TabList>
                  {_.range(0, buoys_array.length, 1).map(value=>
                      <Tab>{buoys_array[value]["name"]}</Tab>
                  )}

                  </TabList>

                    {_.range(0,  buoys_array.length, 1).map(value=>
                      <TabPanel>
                      <ReactNotifications />
                      <button onClick={ ()=>{this.take_data(buoys_array[value]["name"]);} }>Download Data</button>
                      <button onClick={()=>{this.view(buoys_array[value]["name"]);}}>View Data</button>
                      </TabPanel>
                    )}

                </Tabs>

          </div>
      );
        }
      }

      else{
        if (col_data){
          var keys = Object.keys(col_data[1])
          return(
              <div>

              <Tabs>
                <TabList>
                {_.range(0, buoys_array.length, 1).map(value=>
                    <Tab>{buoys_array[value]["name"]}</Tab>
                )}

                </TabList>

                  {_.range(0,  buoys_array.length, 1).map(value=>
                    <TabPanel>
                    <ReactNotifications />
                    <button onClick={ ()=>{this.take_data(buoys_array[value]["name"]);} }>Download Data</button>
                    <button onClick={()=>{this.view(buoys_array[value]["name"]);}}>View Data</button>
                    </TabPanel>
                  )}

              </Tabs>

              <TableContainer style={{ width: 1300}} component={Paper}>
              <Table style={{ width: 1300 }} aria-label="simple table">

              <TableHead>
              <TableRow>
              {_.range(1, keys.length, 1).map( value =>
                <TableCell align="right">{keys[value]}</TableCell>
              )}
               </TableRow>
              </TableHead>

              <TableBody>
              {_.range(0, col_data.length, 1).map( value =>
                <TableRow>
                <TableCell align="right">{col_data[value][keys[1]]}</TableCell>
                <TableCell align="right">{col_data[value][keys[2]]}</TableCell>
                <TableCell align="right">{col_data[value][keys[3]]}</TableCell>
                <TableCell align="right">{col_data[value][keys[4]]}</TableCell>
                <TableCell align="right">{col_data[value][keys[5]]}</TableCell>
                <TableCell align="right">{col_data[value][keys[6]]}</TableCell>
                <TableCell align="right">{col_data[value][keys[7]]}</TableCell>
                <TableCell align="right">{col_data[value][keys[8]]}</TableCell>
                <TableCell align="right">{col_data[value][keys[9]]}</TableCell>
                </TableRow>
              )}
              </TableBody>

              </Table>
              </TableContainer>

              </div>
          );
        }
        else{
          return(
          <div>
                <Tabs>
                  <TabList>
                  {_.range(0, buoys_array.length, 1).map(value=>
                      <Tab>{buoys_array[value]["name"]}</Tab>
                  )}

                  </TabList>

                    {_.range(0,  buoys_array.length, 1).map(value=>
                      <TabPanel>
                      <ReactNotifications />
                      <button onClick={ ()=>{this.take_data(buoys_array[value]["name"]);} }>Download Data</button>
                      <button onClick={()=>{this.view(buoys_array[value]["name"]);}}>View Data</button>
                      </TabPanel>
                    )}

                </Tabs>

          </div>
      );
        }
      }

    }

    else{
    console.log("Error: Render Asynchronous React JS Issue! Reload Page.");
    return(
      <div>
          <h2>Error: Render Asynchronous React JS Issue! Reload Page.</h2>
      </div>
    );
  }

  }

}


export default Buoy_Form;
