import React from 'react';
import Layout from '../layout/Layout.js';
import Loader from 'react-loader';

class BindTask extends React.Component {

  getBindTask() {
    const self = this;
    fetch(`/api/bind/${this.props.id}`)
      .then(function(response) {
        console.log(response);
        if (response.status === 200) {
          clearInterval(self.poller);
          self.setState({ complete: true, error: null, task: response.json() });
        }
      }).catch(function(ex) {
        console.log(ex);
        self.setState({ complete: true, error: ex, task: null })
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
    const isComplete = this.props.isComplete;
    return (
      <Layout>
        <h1>{id}</h1>
        <div>
          {id}
        </div>
        <Loader loaded={isComplete}>
          DONE BRO
        </Loader>
      </Layout>
    );
  }
}

BindTask.propTypes = {
  id: React.PropTypes.string.isRequired,
  isComplete: React.PropTypes.bool.isRequired
};

export default BindTask;
