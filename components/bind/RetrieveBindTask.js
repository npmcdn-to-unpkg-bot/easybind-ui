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
    fetch(`${Config.API_URL}/api/bind/${this.props.id}`)
      .then((response) => {
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

    return (
      <Layout>
        <h1>{id}</h1>
        <div>
          {id}
        </div>
        <Loader loaded={task !== null}>
          <div>
            <a href="{this.state.task.url}"></a>
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
