import React, { Component } from 'react';
import './App.css';
import Header from './Header'
import SearchBar from './SearchBar'
import SideBar from './SideBar'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

require('dotenv').config()




const styles = {
  root: {
    flexGrow: 1,
  },
  
};

class App extends Component {
  constructor(props){
    super(props);
    this.state ={
      mapIsReady:false,
      query:"",
      places:[],
      filtered:[],
      m:[]
    }

    this.updateQuery = this.updateQuery.bind(this);
    this.initMap = this.initMap.bind(this)

  }

  componentWillMount() {
    this.loadGoogleMapScript();
  }
  componentDidMount(){

    window.gm_authFailure = this.gm_authFailure;

    //we load the google map script when its ready
    //we get the venues when they are ready
    this.getVenues()
    
  }

  loadGoogleMapScript(){
    const ApiKey = process.env.REACT_APP_GKEY;
    console.log(process.env)
    const script = window.document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${ApiKey}`
    script.async = true;
    script.defer= true;
    script.onerror = function(){window.alert("The Google Maps API failed to load data!")}
    //this is a callback to wait until the code has loaded
    script.addEventListener('load', () =>{
      this.setState({mapIsReady:true})
    });
    window.document.body.appendChild(script)

  }

  componentDidUpdate(){
   //once the script is uploaded to the window load up the map     
      this.initMap()
    }



  //create markers
  initMap(){
    //if map is ready to load
    if(this.state.mapIsReady){

    // Create A Map use window so the browser can access it
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 41.8781, lng: -87.6298},
      zoom: 13
        })  
    
  //create markers
  //let markers = []
  let venues = null;
  let filtered = this.state.filtered

  //create infowindow
  let infowindow = new window.google.maps.InfoWindow();


  console.log(filtered)
  //updateSearchedPlaces function is not working properly
  //it does not changed the state of filtered to this.state.places
  //this if statement is to fix this bug 
  
  if(filtered.length === 0){
    venues = this.state.places
  }else{
    venues = filtered
  }

  //create markers from venues
  venues.forEach(place => {
      //check to see if there are null values

      let name = place.venue.name || 'unknown'
      let street = place.venue.location.address || 'unknown'
      let city = place.venue.location.formattedAddress[1] || 'unknown'
      


      //setup contents for inforwindow
      let contentString =  `<div>  <h3>${name}</h3>  <p>${street}</p
      ><p>${city} </p></div>`

      let marker = new window.google.maps.Marker({
        position:{lat:place.venue.location.lat,lng:place.venue.location.lng},
        map:map,
        id:place.venue.id,
        name:place.venue.name,
        animation:window.google.maps.Animation.DROP
      })
      //add eventListener to markers for animation
      marker.addListener('click', () => {
        if (marker.getAnimation() !== null) { marker.setAnimation(null); }
        else { marker.setAnimation(window.google.maps.Animation.BOUNCE); }
        setTimeout(() => { marker.setAnimation(null) }, 3000);
      });

      //add eventListener to markers for infowindow
      window.google.maps.event.addListener(marker, 'click', () => {
        infowindow.setContent(contentString);
        map.setZoom(13);
        map.setCenter(marker.position);
        infowindow.open(this.map, marker);
        map.panBy(0, -125);
     });

      this.state.m.push(marker)
    
    })
    //console.log("mark",markers)
          }//end of if statement

  }


  updateQuery = (query) =>{
    this.setState({
      query:query
    })
    this.updateSearchedPlaces(query)
}

  updateSearchedPlaces = (query) =>{
    //if someone preforms a query
    //check to see if the query-word is in the props.places array

    if(query){
        //the map is updated aschysounsly we have to check if there is an empty array
        //if there are venues that are loaded then we put them in a variable
        let filteredPlaces = this.state.places
            
        //we filter the venue results from foursquare using the filter method
        filteredPlaces = filteredPlaces.filter((place) => {
        
          //change both query and venue name from 4square to lower case to compare
          //if the letters from the query are in the venue then return the results
          let placeName = place.venue.name.toLowerCase().search(query.toLowerCase()) !== -1;

        return placeName
       })

       this.setState({
       filtered: filteredPlaces
       })
    }
    
}
    


gm_authFailure(){
    window.alert("Google Maps error!")
}


 handleErrors(response) {
  if (!response.ok) {
      throw Error(response.statusText);
  }
  return response;
}

//get places for foursquare
getVenues(){
  
  //fetch the function
  fetch('https://api.foursquare.com/v2/venues/explore?client_id=X1MSP3S2NAEMOOXXBN1JGB2SXSRTHMFALEEQGNJFGOS4JR1K&client_secret=H5F0ZKW53GMOT0EEFDKAS0X3NM30UXS4AQDSVVE2GHU5OGAI&&v=20180323&near=Chicago&query=museum')
  //body.json() returns a promise it stringifies the response of the api call  
  .then(this.handleErrors)
  .then((response) => response.json())
     .then(data =>{
        // Code for handling API response
        this.setState({
          places:data.response.groups[0].items,
          filtered:data.response.groups[0].items
        })
        
  
     })
     .catch((err) =>{alert('There is a problem',err)})
   
  }

  markerClick = venueID =>{
      let findMarker = this.state.m.find(marker => marker.id === venueID);
    
      //console.log(venueID)
      window.google.maps.event.trigger(findMarker,'click');
  }


  render() {
    //console.log(this.state.m)
    return (
      <div>

      <Grid container spacing={24}>

        <Grid item xs={12}>
          <Header/>
        </Grid>

        <Grid item xs={12}>
          <SearchBar query={this.state.query} updateQuery ={this.updateQuery}/>
        </Grid>

        <Grid item xs={5} >
          <SideBar places={this.state.filtered} map={this.map} markers={this.state.m} markerClick={this.markerClick}/>
        </Grid>

        <Grid item xs={7}>
          <main id="map" role="application"></main>
        </Grid>

      </Grid>



      </div>
    )
  }
}

export default withStyles(styles)(App);
