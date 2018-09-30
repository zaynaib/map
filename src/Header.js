import React, { Component } from 'react'
import './App.css'

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = {
  root: {
    flexGrow: 1,
  },
};

function Header(props) {
      const { classes } =props;

      return(
        

        <div >
        <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="title" color="inherit">
            Photos
          </Typography>
          </Toolbar>

        </AppBar>

        
        {/* 
      <header>
         <h1 role="banner">Neighborhood Map</h1>
       </header>
       */}

        </div>
      )
    }
  
  export default withStyles(styles)(Header);