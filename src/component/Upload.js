import React, {Component, Fragment} from 'react'; 

// import Components
import Search from './Search';
import swal from 'sweetalert';

// import styles
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';



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
        <div className="upload">
          <h1 Typography variant='display1' align='center' gutterBottom>React file upload</h1>
          <label htmlFor="file" >Upload Csv to Company Directory</label>
          <input type="file" name="file" id="file" onChange={this.handleFiles} accept=".csv"/>
          <TextField label='Exercise' onChange={this.handleChange} margin='normal' /> 
        </div>
        <Search data={this.state.data}/>
      </Fragment>
    );
  }
}

export default Upload;

