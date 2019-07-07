import React, {Component, Fragment} from 'react'; 
import {data} from '../data';


class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data,
      contacts: '',
      filterInput: ''
    };
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });

    if (e.target.value === '') {
      this.setState({
        contacts: this.props.contacts
      });
    }else {
      const filterSearch = this.props.contacts.filter( item => {
        return item.First_name.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1 || item.Last_name.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1;
      });
      this.setState({
        contacts: filterSearch
      })
    }
  };
  
  componentDidUpdate(prevProps) {
    if (this.props.contacts !== prevProps.contacts) {
      this.setState({
        contacts: this.props.contacts
      })
    }
  }

  render() {
    return (
      <Fragment>
        <div className="resultContainer" aria-live="polite">
          {this.props.contacts.length ?
            (<div className="searchFilter">
              <label htmlFor="filter">Filter Search</label>
              <input 
                type="text"
                placeholder="search"
                name="filterInput"
                value={this.state.filterInput}
                id="filter"
                onChange={this.handleChange}
                onKeyDown={this.onKeyDown}
              />
            </div>
            ): null
          }
        
        <ul className="contactResult">
          {this.state.contacts.length ? 
            this.state.contacts.map(item => {
              const {
                Id, 
                First_name:firstName, 
                Last_name:lastName, 
                Email, 
                Country,
                Age
              } = item;
              return (
                <li key={Id} className="contactCard">
                  <h2 className="name">{firstName} {lastName}</h2>
                  <p className="age">Age: {Age}</p>
                  <p className="email">Email: <a href={`mailto:${Email}`}>{Email}</a></p>
                  <p className="address">Address: {item["Street address"]}, {Country}</p>
                  <p className="company">Company: <a rel="noopener noreferrer" target="_blank" href={`www.${item["Company Domain"]}`}>{item["Company Name"]}</a></p>
                  <p className="carSpecs">Car Specifications: {item["Car Color"]} {item["Car Make"]} {item["Car Model"]}</p>
                </li>

              )
            }): (<p>your search returned no results</p>)
          }
        </ul>


        </div>

      </Fragment>
    );
  }
}

export default Result;
