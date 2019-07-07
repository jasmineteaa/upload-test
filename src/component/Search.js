import React, {Component, Fragment} from 'react'; 
import swal from 'sweetalert';

// import components
import Result from './Result';

// Sorting, graphs, analytics are all allowed.We want to see a useful way to view this data
// we are looking for a single page application

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      userInput: '',
      contacts: [],
    };
  }
  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data){
      this.setState({
        data: this.props.data
      })
    }
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
      this.setState({
        contacts: filtered
      })
    } else {
      this.setState({
        contacts: []
      })
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
    if (this.state.userInput){
      this.searchContact(this.state.userInput.toLowerCase());
    }else {
      swal({
        title: 'oops',
        text: 'please enter a search value',
        icon: 'warning'
      });
    }
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
        <Result contacts={this.state.contacts} />
      </Fragment>
    );
  }
}

export default Search;

