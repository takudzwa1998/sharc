import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import './App.css';

const Footer = () => {
  return (
    <div >
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
