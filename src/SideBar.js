//https://www.w3schools.com/howto/howto_js_sidenav.asp

import React, { Component } from 'react'
import M from "materialize-css/dist/js/materialize.min.js";
import "materialize-css/dist/css/materialize.min.css";
import {SideNav} from 'react-materialize'

class SideBar extends Component{



 DOMContentLoaded = () =>{
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems, {
    edge: "left",
    inDuration: 250
  })
 }

 
    render(){
      //console.log(this.props.places, "sidebar");
      if(this.props.places.length !== 0){
        const places = this.props.places;
        //console.log(places, "side")
   
        return(
          <div>
          <ul id="slide-out" className ="sidenav">
          {/*places.map(place => (<div>{place.venue.id}</div>))*/}
           {console.log(places[0].venue.name)}
           
           {places.map((place) =>
   
              <li key={place.venue.id}><a>{place.venue.name}</a></li>

            )}
            

          </ul>
          <a href="#" data-target="slide-out" className="sidenav-trigger" onClick={this.DOMContentLoaded}><i className="material-icons">menu</i></a>
          </div>
    
        )

      }
      else{
        return(
          <div></div>
        )
      }
    
      
    }

  }

export default SideBar;