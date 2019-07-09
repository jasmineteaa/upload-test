import React, {Component, Fragment} from 'react'; 
import {data} from '../data';

// import styles
import { Card, CardContent, Typography} from '@material-ui/core';



class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data,
      contacts: [],
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
              } = item;
              return (
                <Card>
                  <CardContent>
                    <li key={Id} className="contactCard">
                      <Typography gutterBottom variant="headline" component="h2">{firstName} {lastName}</Typography>
                      <Typography component="p">Email: <a href={`mailto:${Email}`}>{Email}</a></Typography>
                      <Typography component="p">Address: {item["Street address"]}, {Country}</Typography>
                      <Typography component="p">Company: <a rel="noopener noreferrer" target="_blank" href={`www.${item["Company Domain"]}`}>{item["Company Name"]}</a></Typography>
                      <Typography component="p">Car Specifications: {item["Car Color"]} {item["Car Make"]} {item["Car Model"]}</Typography>
                    </li>
                  </CardContent>
                </Card>

              )
            }): (<p>your search returned {this.props.contacts.length} results</p>)
          }
        </ul>


        </div>

      </Fragment>
    );
  }
}

export default Result;
