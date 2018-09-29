//https://www.klaasnotfound.com/2016/11/06/making-google-maps-work-with-react/
//https://reactjs.org/docs/faq-ajax.html
//https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
//https://scotch.io/tutorials/how-to-use-the-javascript-fetch-api-to-get-data
//https://reactjs.org/docs/faq-ajax.html
// https://medium.com/@thejasonfile/fetch-vs-axios-js-for-making-http-requests-2b261cdd3af5 ***
//https://scotch.io/tutorials/lazy-loading-routes-in-react
//https://reactpatterns.com/

import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import SearchBar from './SearchBar';

class App extends Component {
  constructor(props){
    super(props);
    this.state ={
      places:[]
    }
  }

  componentDidMount(){
    window.gm_authFailure = this.gm_authFailure;
    this.getFourSquareVenues()
  }
  gm_authFailure(){
    window.alert("Google Maps error!")
}

  //create API with foursquare
  getFourSquareVenues = () =>{
    //fetch the function


  fetch('https://api.foursquare.com/v2/venues/explore?client_id=X1MSP3S2NAEMOOXXBN1JGB2SXSRTHMFALEEQGNJFGOS4JR1K&client_secret=H5F0ZKW53GMOT0EEFDKAS0X3NM30UXS4AQDSVVE2GHU5OGAI&&v=20180323&near=Chicago&query=museum')
  //body.json() returns a promise it stringifies the response of the api call  
  .then((response) => response.json())
     .then(data =>{
        // Code for handling API response
        this.setState({
          places:data.response.groups[0].items
        }, this.renderMap())
        
  
     })
     .catch((err) =>{console.log('There is a problem',err)})
   
  }

  renderMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyD1DrDBUd6GNL2EIBCxK-K0OjkTny8kbuA&callback=initMap")
    window.initMap = this.initMap
  }



  initMap = () => {

    // Create A Map
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 41.8781, lng: -87.6298},
      zoom: 13
    })  

    //create infowindow
    var infowindow = new window.google.maps.InfoWindow();

    //then use map to create markers from venue
    this.state.places.map(place => {
            var contentString = `${place.venue.name}`

            let marker =new window.google.maps.Marker({
               position :{lat:place.venue.location.lat,lng:place.venue.location.lng},
               map:map,
               animation:window.google.maps.Animation.Drop,
               title:place.venue.name
            })
            
            //add a function the markers to show the info windows
            marker.addListener('click', function() {
              //Change the content
              infowindow.setContent(contentString)
              //Open info window
              infowindow.open(map, marker);

              if (marker.getAnimation() !== null) {
                marker.setAnimation(null);
              } else {
                marker.setAnimation(window.google.maps.Animation.BOUNCE);
              }
              
            });
            return marker;

          }
      
      )
   
  }

  render() {
    return (
      <div className="container">
        <Header />

        {/*<SideBar places ={this.state.places}/>*/}
        <SearchBar places ={this.state.places} />
        <main role="main">
          <div id="map"></div>
        </main>
        

      </div>
    )
  }
}

function loadScript(url) {
  var index  = window.document.getElementsByTagName("script")[0]
  var script = window.document.createElement("script")
  script.src = url
  script.async = true
  script.defer = true
  script.onerror = function(){window.alert("The Google Maps API failed to load data!")}
  index.parentNode.insertBefore(script, index)
}


export default App;
