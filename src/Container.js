import React, { Component } from 'react'
import './App.css'

class Container extends Component {
  constructor(props){
    super(props);
    this.state ={
      places:[]
    }
  }

  componentDidMount(){
    this.getFourSquareVenues()
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
        //console.log(data.response.groups[0].items)
        console.log("working")
  
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

    //then us map to create markers from venue
    this.state.places.map(place =>{
            var contentString = `${place.venue.name}`

            let marker =new window.google.maps.Marker({
               position :{lat:place.venue.location.lat,lng:place.venue.location.lng},
               map:map,
               title:place.venue.name
            })

            marker.addListener('click', function() {
              //Change the content
              infowindow.setContent(contentString)
              //Open info window
              infowindow.open(map, marker);
            });
          })
   
  }

  render() {
    return (
      <main>
        <div id="map"></div>
      </main>
    )
  }
}

function loadScript(url) {
  var index  = window.document.getElementsByTagName("script")[0]
  var script = window.document.createElement("script")
  script.src = url
  script.async = true
  script.defer = true
  index.parentNode.insertBefore(script, index)
}

export default Container;
