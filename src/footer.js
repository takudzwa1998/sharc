//****************************************************************************************************************************//
//                Footer Page
//Footer Code adapted from mdbootstrap.com, link: {https://mdbootstrap.com/docs/react/navigation/footer/}
//Code modified by: Takudzwa Shumbamhini
//****************************************************************************************************************************//


import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import './App.css';
import partners from './images/partners.PNG';
import partners_two from './images/partners_two.PNG';
/**
*Footer - simple footer for public site
*@return {Object} Footer UI
*@author https://mdbootstrap.com/docs/react/navigation/footer/
*/

const Footer = () => {
  return (
    <div className="footer-color">
    <Grid item xs={18} className="footer">

      <Paper className="paper">
        <MDBFooter color="blue" >
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Produced by: <a href="https://www.linkedin.com/in/taku-shumba/"> Takudzwa Shumbamhini</a>
        </MDBContainer>
      </div>
        </MDBFooter>
      </Paper>
    </Grid>
    </div>
  );
}

export default Footer;
