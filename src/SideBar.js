//https://www.w3schools.com/howto/howto_js_sidenav.asp

//https://material-ui.com/api/drawer/

import React, { Component } from 'react'
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

const styles = {

};

class SideBar extends Component{






 
    render(){
      //places is rendered on the map asynchrously the inital state will be an empty array
      //console.log(this.props)

      //have to check if the state has bee populated      

        const places = this.props.places;
        const { classes } = this.props;

        <List component="nav">
        <ListItem button>
          <ListItemText primary="Field Muesum" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Drafts" />
        </ListItem>
      </List>
   
        return(
          <div>

          {/* loop over all the venues from foursquare api
          <ul id="slide-out" className ="side-nav" role="complementary">
           
           {places.map((place) =>
              <li key={place.venue.id}><a aria-label={`${place.venue.name}`}>{place.venue.name}</a></li>
            )}
          </ul>
          */}

          <List className="side-nav" role="complementary">
          {places.map((place) =>
              <ListItem key={place.venue.id}>
                  <a aria-label={`${place.venue.name}`}>
                  <ListItemText primary={`${place.venue.name}`}/>
                  </a>
              </ListItem>
            )}
            

          </List>
          </div>
    
        )

      
    
      
    }

  }

export default withStyles(styles)(SideBar);