import React from 'react';
import Layout from '../layout/Layout';
import Loader from 'react-loader';
// Config is injected by webpack
import Config from 'Config'; // eslint-disable-line import/no-unresolved

class RetrieveBindTask extends React.Component {

  constructor() {
    super();
    this.state = { task: null, error: null };
  }

  componentDidMount() {
    const self = this;
    this.poller = setInterval(() => {
      self.getBindTask();
    }, 5000);
  }

  getBindTask() {
    const self = this;
    fetch(`${Config.API_URL}/v1/bind/${this.props.id}`)
      .then((response) => {
        console.log(response.status);
        if (response.status === 200) {
          return response.json();
        }
        return null;
      })
      .then((json) => {
        if (json !== null) {
          clearInterval(self.poller);
          self.setState({ error: null, task: json });
        }
      })
      .catch((ex) => {
        self.setState({ error: ex, task: null });
      });
  }

  render() {
    const id = this.props.id;
    const task = this.state.task || null;
    const downloadUrl = (task === null) ? "" : task.url;

    return (
      <Layout>
        <h4>Waiting for your results...</h4>
        <br />
        <Loader loaded={task !== null}>
          <div>
            <a href={downloadUrl}>Click here to download your file</a>
          </div>
        </Loader>
      </Layout>
    );
  }
}

RetrieveBindTask.propTypes = {
  id: React.PropTypes.string.isRequired,
  isComplete: React.PropTypes.bool.isRequired,
  error: React.PropTypes.string,
  downloadUrl: React.PropTypes.string
};

export default RetrieveBindTask;
