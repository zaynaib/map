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
    if(query){
        if(this.props.places.length !== 0){
            let filteredPlaces = this.props.places
            //console.log(filteredPlaces)


            filteredPlaces = filteredPlaces.filter((place) => {
                let placeName = place.venue.name.toLowerCase().search(query.toLowerCase()) !== -1;
                return placeName
            })
    
            this.setState({
                searchedPlaces: filteredPlaces
              })
            

        }
      
        //check to see if the query-word is in the props.places array
      
    }
    //if there is no query then just return the just set the state of searchplaces as the original
    //this props.places array
  
}

   

    
  handleSubmit = (event) => {
    console.log('A name was submitted: ' + this.state.query);
    event.preventDefault();
  }
    render(){

        return(
            <div>
            <form onSubmit={this.handleSubmit}>
                <label>
                    Search For Museum:
                    <input type="text" value={this.state.query} onChange={(event) =>
                         this.updateQuery(event.target.value)}/>

                </label>
                <input type="submit" value="Submit" />

            </form>
                <SideBar places={this.props.places} searchedPlaces={this.props.searchedPlaces}/>
            </div>
        )
    }
}
export default SearchBar