//https://www.w3schools.com/howto/howto_js_sidenav.asp

//https://material-ui.com/api/drawer/

import React, { Component } from 'react'
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Button from '@material-ui/core/Button';


const styles = {


};

class SideBar extends Component{
  //      let marker = this.markers.filter(m => m.venue.id === venue.id)[0];


 
 
 
 
    render(){
      //places is rendered on the map asynchrously the inital state will be an empty array
      //console.log(this.props)

      //have to check if the state has bee populated      

        const places = this.props.places;
        const markers = this.props.markers

        const { classes } = this.props;
        

     

        console.log(this.props)
   
        return(
          <div>

          <List className="side-nav" role="complementary">
          {places.map((place) =>
              <ListItem 
              key={place.venue.id} tabIndex={0}  
              style={{height: 46}} 
              button={true}
              aria-label={`${place.venue.name}`}
              onClick={() => this.props.markerClick(place.venue.id)}
              >
                  
                  <ListItemText primary={`${place.venue.name}`} />
                  
              </ListItem>
            )}
            

          </List>
          </div>
    
        )

      
    
      
    }

  }

export default withStyles(styles)(SideBar);