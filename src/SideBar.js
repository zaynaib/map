//https://www.w3schools.com/howto/howto_js_sidenav.asp

//https://material-ui.com/api/drawer/

import React, { Component } from 'react'
import M from "materialize-css/dist/js/materialize.min.js";
import "materialize-css/dist/css/materialize.min.css";

class SideBar extends Component{



 DOMContentLoaded = () =>{
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems, {
    edge: "left",
    inDuration: 250,
    closeOnClick: true,
    onOpenStart: function () {
      alert("Search is triggered press okay to see results");
  },
  onCloseEnd: function () {
      console.log("same");
  }
  })
 }


 
    render(){
      //places is rendered on the map asynchrously the inital state will be an empty array
      //console.log(this.props)

      //have to check if the state has bee populated      

        const places = this.props.places;

   
        return(
          <div>

          {/* loop over all the venues from foursquare api*/}
          <ul id="slide-out" className ="side-nav" role="complementary">
           
           {places.map((place) =>
              <li key={place.venue.id}><a aria-label={`${place.venue.name}`}>{place.venue.name}</a></li>
            )}
          </ul>
            {/*This is a button to toggle the side menu*/}
          </div>
    
        )

      
    
      
    }

  }

export default SideBar;