import React, {Component, Fragment} from 'react';
import {
  BrowserRouter as Router, 
  Route
} from 'react-router-dom';

// import Components
import Upload from './component/Upload';
import Nav from './component/Nav';
import Graph from './component/Graph';

// import styles
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  updateData = (data) => {
    this.setState({
      data
    })
  } 
  render() {
    return (
      <Router>
        <Fragment>
          <Nav />

          <Route exact path='/'  
            render={() => { return (<Upload updateData = {this.updateData}/>) }} />
          <Route path='/graph' 
            render={() => { return (<Graph data={this.state.data} />) }} />

        </Fragment>
      </Router>
    );
  }
}

export default App;
