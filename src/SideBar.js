//https://www.w3schools.com/howto/howto_js_sidenav.asp

//https://material-ui.com/api/drawer/

import React, { Component } from 'react'
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";


const styles = {


};

class SideBar extends Component{
  
    render(){
      //places is rendered on the map asynchrously the inital state will be an empty array
      //console.log(this.props)

        const places = this.props.places;
   
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