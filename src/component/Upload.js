import React, {Component} from 'react'; 
import axios, {post} from 'axios';


// Given the test_data1.csv file

// create an interface to upload the csv file, and display the data in a clever way.


class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleChange = (e) => {
    e.preventDefault();
    let files = e.target.files;

    // filereader obj - async read contents of files thats been uploaded through user input 
    let reader = new FileReader();
    // reads content of data[not always structured in js format]
    // returns result attribute with data url:
    reader.readAsDataURL(files[0]);

    reader.onload = (e) => {
      console.warn("img data", e.target.result);

      const url ="http://jasmineteaa.com/";
      const formData = {file:e.target.result}
      return post(url, formData)
        .then(response => console.warm("result", response))
    }
  }

  render() {
    return (
      <div>
        <h1>React file upload</h1>
        <input type="file" name="file" onChange={this.handleChange}/>
      </div>
    );
  }
}

export default Upload;

