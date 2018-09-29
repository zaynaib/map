//https://www.w3schools.com/howto/howto_js_sidenav.asp

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
      console.log("I trigger as soon as the page is loaded");
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
      
      if(this.props.places.length !== 0){
        const places = this.props.places;
   
        return(
          <div>

          {/* loop over all the venues from foursquare api*/}
          <ul id="slide-out" className ="sidenav">
           
           {places.map((place) =>
              <li key={place.venue.id}><a>{place.venue.name}</a></li>
            )}
          </ul>
            {/*This is a button to toggle the side menu*/}
            <a href="#" data-target="slide-out" className="sidenav-trigger" onClick={this.DOMContentLoaded}><i className="material-icons">menu</i></a>
          </div>
    
        )

      }
      else{
        return(
          <div>404 Not Found</div>
        )
      }
    
      
    }

  }

export default SideBar;