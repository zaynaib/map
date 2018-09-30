//https://dev.to/sage911/how-to-write-a-search-component-with-suggestions-in-react-d20
//https://reactjs.org/docs/thinking-in-react.html
//https://codepen.io/mtclmn/pen/QyPVJp?editors=1010

import React, {Component} from 'react'

class SearchBar extends Component{

    render(){

        return(
            <div >
            <form className="searchForm">
                <label>
                    Search For Museum:
                    <input className="input-field" type="text" value={this.props.query} onChange={(event) =>
                         this.props.updateQuery(event.target.value)}/>

                </label>

            </form>
            </div>
        )
    }
}
export default SearchBar