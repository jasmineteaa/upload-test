import React, {Component, Fragment} from 'react'; 

// import Components
import Search from './Search';
import swal from 'sweetalert';


class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  handleFiles = e => {
    if (window.FileReader){
      let files = e.target.files;
      this.getAsText(files[0]);
    }else {
      swal({
        title: 'error',
        text: 'FileReader is not supported in this browser',
        icon: 'error'
      });
    }
  }
  getAsText = (fileToRead) => {
    let reader = new FileReader();

    reader.readAsText(fileToRead);
    reader.onload = this.loadHandler;
    reader.onerror = this.errorHandler;
  }
  loadHandler = e => {

    const csv = e.target.result;
    this.processData(csv);
  }
  // csv file contains header names as first lines
  processData = (csv) => {
    const textLines = csv.split(/\r\n|\n/);
    let lines = [];

    //first line of csv
    const keys = textLines.shift().split(',');

    while (textLines.length - 1) {
      const arr = textLines.shift().split(',');
      let obj = {};
      for (var i = 0; i < keys.length - 1; i++) {
        obj[keys[i]] = arr[i];
      }
      lines.push(obj);
    }
    this.props.updateData(lines);
    this.setState({
      data: lines
    })


  }
  errorHandler = e => {
    if (e.target.error.name === "NotReadableError") {
      swal({
        title: 'oops',
        text: 'cannot read file',
        icon: 'warning'
      });
    }
  }

  render() {
    return (
      <Fragment>
        <div className="wrapper">
          <div className="upload">
            <h1 Typography variant='display1' align='center' gutterBottom>Simple React Data Sorter</h1>
            <h2>Upload any CSV from your Company's Directory. This app will sift and organize your contacts so that you can access them easily.</h2>
            <input type="file" name="file" id="file" onChange={this.handleFiles} accept=".csv"/>
            <label htmlFor="file">Upload CSV File</label>

          </div>
          <Search data={this.state.data}/>
        </div>
      </Fragment>
    );
  }
}

export default Upload;

