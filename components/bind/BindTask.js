import React from 'react';
import Layout from '../layout/Layout';
import Loader from 'react-loader';
import Config from '../Config'

class BindTask extends React.Component {

  constructor() {
    super();
    this.state = { task: null, error: null };
  }

  getBindTask() {
    const self = this;
    fetch(`http://localhost:8080/api/bind/${this.props.id}`)
      .then(function(response) {
        if (response.status === 200) {
            return response.json();
        }
        return null;
      })
      .then(function(json) {
        if (json !== null) {
          clearInterval(self.poller);
          self.setState({ error: null, task: json });
        }
      }).catch(function(ex) {
        self.setState({ error: ex, task: null })
      })
  };

  componentDidMount() {
    const self = this;
    this.poller = setInterval(function() {
      self.getBindTask();
    }, 5000);
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

BindTask.propTypes = {
  id: React.PropTypes.string.isRequired,
  isComplete: React.PropTypes.bool.isRequired,
  error: React.PropTypes.string,
  downloadUrl: React.PropTypes.string
};

export default BindTask;
