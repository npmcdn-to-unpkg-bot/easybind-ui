import React from 'react';
import Layout from '../layout/Layout';

import Dropzone from 'react-dropzone';

class CreateBindTask extends React.Component {

  constructor() {
    super();
    this.state = { files: [] };
  }

  onDrop(files) {
    this.setState({ files });
  }

  onOpenClick() {
    this.refs.dropzone.open();
  }

  render() {
    return (
      <Layout>
        <div>
          <Dropzone ref="dropzone" onDrop={this.onDrop}>
            <div>Try dropping some files here, or click to select files to upload.</div>
          </Dropzone>
          <button type="button" onClick={this.onOpenClick}>
            Open Dropzone
          </button>

          {this.state.files.length > 0 ?
            <div>
              <h2>Uploading {this.state.files.length} files...</h2>
              <div>
              {this.state.files.map((file) => <img alt="preview" src={file.preview} />)}
              </div>
            </div> : null}
        </div>
      </Layout>
    );
  }
}


export default CreateBindTask;
