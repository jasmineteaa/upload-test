import React, {Component, Fragment} from 'react';
import {
  BrowserRouter as Router, 
  Route
} from 'react-router-dom';

// import Components
import Upload from './component/Upload';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  // pass data state from upload component
  updateData = (data) => {
    this.setState({
      data
    })
  } 
  render() {
    return (
      <Router>
      {/* Router implemented for future plans to have page where users can interact and graph data */}
        <Fragment>
          <Route exact path='/'  
            render={() => { return (<Upload updateData = {this.updateData}/>) }} />
        </Fragment>
      </Router>
    );
  }
}

export default App;
