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
}


    handleChange = (event) =>{
        this.setState({query:event.target.value})
    }

    
  handleSubmit = (event) => {
    console.log('A name was submitted: ' + this.state.query);
    event.preventDefault();
  }
    render(){
        console.log(this.props)

        return(
            <div>
            <form onSubmit={this.handleSubmit}>
                <label>
                    Search For Museum:
                    <input type="text" value={this.state.query} onChange={this.handleChange}/>
                </label>
                <input type="submit" value="Submit" />

            </form>
            </div>
        )
    }
}
export default SearchBar