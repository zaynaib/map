//https://www.klaasnotfound.com/2016/11/06/making-google-maps-work-with-react/
//https://reactjs.org/docs/faq-ajax.html
//https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
//https://scotch.io/tutorials/how-to-use-the-javascript-fetch-api-to-get-data

import React, { Component } from 'react'
import './App.css'

class App extends Component {
  constructor(props){
    super(props);
    this.state ={
      places:[]
    }
  }

  componentDidMount(){
    this.getFourSquareVenues()
    //this.renderMap()
  }

  //create API with foursquare
  getFourSquareVenues = () =>{
    //fetch the function
    /*
    fetch('https://api.foursquare.com/v2/venues/explore?client_id=X1MSP3S2NAEMOOXXBN1JGB2SXSRTHMFALEEQGNJFGOS4JR1K&client_secret=H5F0ZKW53GMOT0EEFDKAS0X3NM30UXS4AQDSVVE2GHU5OGAI&near=Chicago&query=musuem&limit=15')
          .then( (response) =>{console.log(response)})
          .catch((err) =>{console.log(err)})
      console.log('working')
      */
     fetch('https://api.foursquare.com/v2/venues/explore?client_id=X1MSP3S2NAEMOOXXBN1JGB2SXSRTHMFALEEQGNJFGOS4JR1K&client_secret=H5F0ZKW53GMOT0EEFDKAS0X3NM30UXS4AQDSVVE2GHU5OGAI&v=20180323&limit=1&ll=40.7243,-74.0018&query=coffee')
    .then((response) => {
        // Code for handling API response
        console.log(response)
        console.log("working")
    })
    .catch((err) => {
        // Code for handling errors
        console.log('Looks like there was a problem: \n',err)
    });
  }

  renderMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyD1DrDBUd6GNL2EIBCxK-K0OjkTny8kbuA&callback=initMap")
    window.initMap = this.initMap
  }



  initMap = () => {

    // Create A Map
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 40.7243, lng: -74.0018},
      zoom: 8
    })  
    //then us map to create markers from venue
    //var marker = new window.google.maps.Marker({

    //})

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

export default App;
