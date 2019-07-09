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
  updateData = (data) => {
    this.setState({
      data
    })
  } 
  render() {
    return (
      <Router>
        <Fragment>
          <Route exact path='/'  
            render={() => { return (<Upload updateData = {this.updateData}/>) }} />
        </Fragment>
      </Router>
    );
  }
}

export default App;
