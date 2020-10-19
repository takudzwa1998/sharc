import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Timeline } from 'react-twitter-widgets';
import '../App.css';
import board from '../images/board.jpg';
import miz from '../images/miz.jpg';
import buoys from '../images/buoys.jpg';
import more_ice from '../images/more_ice.jpg';

class Scale extends React.Component{

  render(){
    return(
      <div className="root">
      <h2 className="scale-header ">UCT SHARC Buoy: Data Visualisation for the Southern Ocean</h2>
<Grid container spacing={3}>
      <Grid item xs={8}>
          <Paper className="paper">

          The distribution of sea ice in the Marginal Ice Zone (MIZ) in the Southern Ocean (SO) has a significant effect on global climate patterns,
          but our understanding of this unique region suffers from a lack of Antarctic seasonal in situ measurement data, especially over the winter season.

          A variety of interacting forces, including local weather and wave conditions,
          strongly affect the formation and development of sea ice in the MIZ.
          To better characterize sea ice development under the influence of wave dynamics and turbulent environmental conditions,
          in situ measurements and observations are needed.
          </Paper>
      </Grid>

      <Grid item xs={4}>
        <Paper className="paper">
            <Timeline
                dataSource={{
                  sourceType: 'profile',
                  screenName: 'SCALExperiment'
                }}
                options={{
                  height: '400'
                }}
            />
        </Paper>
      </Grid>
</Grid>

      <img width={700} height={700} src={miz}/>

      <Grid item xs={11}>
        <Paper className="paper">
The Department of Electrical Engineering (UCT), the Department of Oceanography (UCT) and the South African
Weather Service have developed a prototype ice-tethered instrument which can be deployed on ice floes the MIZ of the Southern Ocean1.
The prototype sensor buoy was specifically designed for the Antarctic region, to operate remotely under extreme environmental
conditions and provide real-time local data through an Iridium satellite link.
        </Paper>
      </Grid>
      <img  width={700} height={700} src={more_ice}/>

      <Grid item xs={11}>
        <Paper className="paper">
Each unit was designed with Global Positioning System (GPS) sensors for positional data,
 inertial measurement units (IMU) for wave characteristic collection (wave height, wave period and power spectrum)
 and environmental sensors (temperature, humidity, pressure, wind speed and wind direction).
        </Paper>
      </Grid>
      <img  width={700} height={700} src={buoys}/>

      </div>
    );
  }
}

export default Scale;
