//https://dev.to/sage911/how-to-write-a-search-component-with-suggestions-in-react-d20
//https://reactjs.org/docs/thinking-in-react.html
//https://codepen.io/mtclmn/pen/QyPVJp?editors=1010

import React, {Component} from 'react'
import SideBar from './SideBar'

class SearchBar extends Component{
    constructor(props){
        super(props);
        this.state ={
            query:'' ,
            searchedPlaces:[]
        }
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
        if(this.props.places.length !== 0){
            //if there are venues that are loaded then we put them in a variable
            let filteredPlaces = this.props.places
            
            //we filter the venue results from foursquare using the filter method
            filteredPlaces = filteredPlaces.filter((place) => {
                //change both query and venue name from 4square to lower case to compare
                //if the letters from the query are in the venue then return the results
                let placeName = place.venue.name.toLowerCase().search(query.toLowerCase()) !== -1;
                return placeName
            })
    
            this.setState({
                searchedPlaces: filteredPlaces
              })
            

        }

        //if there is no query then give us the full list from foursquare
        else{
            this.setState({
                searchedPlaces: this.props.places
              })
        }
      
      
    }
    
}
    render(){

        return(
            <div >
            <form className="searchForm" onSubmit={this.handleSubmit}>
                <label>
                    Search For Museum:
                    <input className="input-field" type="text" value={this.state.query} onChange={(event) =>
                         this.updateQuery(event.target.value)}/>

                </label>
                <input type="submit" value="Submit" />

            </form>
                <SideBar places={this.state.searchedPlaces} />
            </div>
        )
    }
}
export default SearchBar