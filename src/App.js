import React, {Component} from 'react';
import {data} from './data';



// import Components
import Upload from './component/Upload';
import Search from './component/Search';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    
    console.log(data);
    return (
      <div className="App">
        <Upload />
        <Search />
      </div>
    );
  }
}

export default App;
