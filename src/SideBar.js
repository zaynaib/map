//https://www.w3schools.com/howto/howto_js_sidenav.asp

import React, { Component } from 'react'

class SideBar extends Component{

 
    render(){
      //console.log(this.props.places, "sidebar");
      if(this.props.places.length !== 0){
        const places = this.props.places;
        //console.log(places, "side")
   
        return(
          <nav className ="sidenav">
          {/*places.map(place => (<div>{place.venue.id}</div>))*/}
           {console.log(places[0].venue.name)}
           <ul>
           {places.map((place) =>
   
              <li key={place.venue.id}><a>{place.venue.name}</a></li>

            )}
            </ul>
           
          </nav>
    
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