import React, {Component, Fragment} from 'react'; 
import swal from 'sweetalert';

// import components
import Result from './Result';

// import styles
import {TextField} from '@material-ui/core';


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

  searchContact = name => {
    const filtered = this.state.data.filter(item => {
      return item.First_name.toLowerCase().includes(name) || item.Last_name.toLowerCase().includes(name);
    });
    if (filtered.length) {
      this.setState({
        contacts: filtered
      })
    } else {
      this.setState({
        contacts: []
      })
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
              {/* <label htmlFor="search" className="userInputLabel">Find car owner in the company directory</label> */}
              <TextField 
              label='Find car owner in the company directory' 
              onChange={this.handleChange} 
              value={this.state.userInput}
              margin='normal' 
              name="userInput"
              fullWidth="true"
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

