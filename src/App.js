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
import Header from './Header'
import SearchBar from './SearchBar'
import SideBar from './SideBar'

class App extends Component {
  constructor(props){
    super(props);
    this.state ={
      mapIsReady:false,
      query:"",
      places:[],
      filtered:[],
      smarkers:[]
    }

    this.updateQuery = this.updateQuery.bind(this);
    this.initMap = this.initMap.bind(this)

  }

  componentWillMount() {
    this.loadGoogleMapScript();
  }
  componentDidMount(){

    //we load the google map script when its ready
    //we get the venues when they are ready
    this.getVenues()
    
  }

  loadGoogleMapScript(){

    const ApiKey = 'AIzaSyD1DrDBUd6GNL2EIBCxK-K0OjkTny8kbuA'

    const script = window.document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${ApiKey}`
    script.async = true;
    script.defer= true;
    //this is a callback to wait until the code has loaded
    script.addEventListener('load', () =>{
      this.setState({mapIsReady:true})
    });
    window.document.body.appendChild(script)

  }

  componentDidUpdate(){
   //once the script is uploaded to the window load up the map

      
    

     //console.log(this.map)
     
      this.initMap()

    
    }



  //create markers
  initMap(){
    //if map is ready to load
    if(this.state.mapIsReady){

    // Create A Map use window so the browser can access it
    this.map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 41.8781, lng: -87.6298},
      zoom: 13
        })  
    
  //create markers
  let markers = []
  let venues = null;
  let filtered = this.state.filtered
  if(filtered.length == 0){
    venues = this.state.places
  }else{
    venues = this.state.filtered
  }
  //create markers from venues
  venues.forEach(place => {
      let marker = new window.google.maps.Marker({
        position:{lat:place.venue.location.lat,lng:place.venue.location.lng},
        map:this.map,
        id:place.venue.id,
        name:place.venue.name,
        animation:window.google.maps.Animation.Drop
      })

      markers.push(marker)
    
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

filterVenues(query) {
  let f = query ? this.venues.filter(v => v.name.toLowerCase().includes(query)) : this.venues;
  this.markers.forEach(m => {
    m.name.toLowerCase().includes(query) ?
    m.setVisible(true) :
    m.setVisible(false);
  });
  this.setState({ filtered: f, query: query });
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

        //if there is no query then give us the full list from foursquare
        else{
            this.setState({
                filtered: this.state.places
              })
        }
      
    
}
    


  gm_authFailure(){
    window.alert("Google Maps error!")
}

//get places for foursquare
getVenues(){
  
  //fetch the function
  fetch('https://api.foursquare.com/v2/venues/explore?client_id=X1MSP3S2NAEMOOXXBN1JGB2SXSRTHMFALEEQGNJFGOS4JR1K&client_secret=H5F0ZKW53GMOT0EEFDKAS0X3NM30UXS4AQDSVVE2GHU5OGAI&&v=20180323&near=Chicago&query=museum')
  //body.json() returns a promise it stringifies the response of the api call  
  .then((response) => response.json())
     .then(data =>{
        // Code for handling API response
        this.setState({
          places:data.response.groups[0].items
        })
        
  
     })
     .catch((err) =>{console.log('There is a problem',err)})
   
  }




  render() {

    return (
      <div className="container">
      <Header/>
      
      <SearchBar query={this.state.query} updateQuery ={this.updateQuery}/>

      <SideBar places={this.state.places}/>

        <main role="main">
          <div id="map"></div>
        </main>
        

      </div>
    )
  }
}



export default App;
