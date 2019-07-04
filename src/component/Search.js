import React, {Component, Fragment} from 'react'; 
import {data} from '../data';
import swal from 'sweetalert';
// Sorting, graphs, analytics are all allowed.We want to see a useful way to view this data
// we are looking for a single page application

class Search extends Component {
  constructor() {
    super();
    this.state = {
      data,
      userInput: ''
    };
  }
  // user submit form, search through data return contact 
  // return result
  // else error handling
  searchContact = name => {
    const filtered = this.state.data.filter(item => {
      return item.First_name.toLowerCase().includes(name) || item.Last_name.toLowerCase().includes(name);
    });
    console.log(filtered);
    if (filtered.length) {
      // call other function 
      console.log("return contact")
    } else {
      console.log("no search results")
    }
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.searchContact(this.state.userInput.toLowerCase());
    console.log('submitted!')
  }
  render() {
    return (
      <Fragment>
        <div className="searchContainer">
          <form onSubmit={this.handleSubmit}>
              <label htmlFor="search" className="userInputLabel">Find car owner in the company directory</label>
              <input 
              type="text" 
              className="userInput"
              id="search"
              name="userInput"
              value={this.state.userInput}
              onChange={this.handleChange}
              placeholder="search for a contact"
              />
              <input type="submit" value="search"/>
          </form>
        </div>
      </Fragment>
    );
  }
}

export default Search;

