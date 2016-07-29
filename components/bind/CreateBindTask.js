import React from 'react';
import Layout from '../layout/Layout';
import request from 'superagent';
import Dropzone from 'react-dropzone';
import Select from 'react-select';
// Config is injected by webpack
import Config from 'Config'; // eslint-disable-line import/no-unresolved

import 'react-select/dist/react-select.css';

const uploadFileUrl = `${Config.API_URL}/v1/bind`;

let CreateBindTask = React.createClass({

  getInitialState () {
		return {
      files: [],
      outputFormat: 'PDF'
    };
	},

  onDrop (files) {
    let req = request.post(uploadFileUrl);
    req.field('outputFormat', this.state.outputFormat)
    files.forEach((file) => {
        req.attach('files', file);
    });
    req.end((err, res) => {
      if (err) {
        alert("Error submitting files for binding.");
      } else {
        window.location = `/bind/${res.body.taskReference}`
      }
    });
  },

  onOpenClick () {
    this.refs.dropzone.open();
  },

  onOutputFormatChange(input) {
    this.setState({
      outputFormat: input.value
    });
  },

  render () {
    let dropzoneStyles = {
      borderRadius: '5px',
      backgroundColor: 'white',
      border: '2px dashed rgb(102, 102, 102)',
      width: '100%',
      height: '100px',
      textAlign: 'center'
    };
    let outputOptions = [
      { value: 'PDF', label: 'PDF' },
      { value: 'ZIP', label: 'ZIP' }
    ];
    return (
      <Layout>
        <h4>EasyBind Demo</h4>
        <p>Click the area below to upload up to 5 files. Supports either PDF or ZIP output</p>
        <div>
        <Select
            name="outputFormat"
            value={this.state.outputFormat}
            options={outputOptions}
            onChange={this.onOutputFormatChange} />
            <br />
            <Dropzone ref="dropzone" style={dropzoneStyles} onDrop={this.onDrop}>
                <div style={{marginTop: '40px'}}>
                  <b>Click to select files to upload.</b>
                </div>
            </Dropzone>
            {this.state.files.length > 0 ? <div>
            <h2>Uploading {this.state.files.length} files...</h2>
            <div>{this.state.files.map((file) => <img src={file.preview} /> )}</div>
            </div> : null}
        </div>
      </Layout>
    );
  }
});

export default CreateBindTask;
