import React from 'react'
import './App.css'

import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    flexGrow: 1,
  },
};

function Header(props) {
      return(
      <div>
        <header tabIndex={0}>
          <h1 role="banner">Neighborhood Map</h1>
        </header>

      </div>
      )
    }
  
  export default withStyles(styles)(Header);