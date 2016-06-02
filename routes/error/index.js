import React from 'react';
import { Layout } from '../../components';

function ErrorPage({ title, message, stackTrace }) {
  return (
    <Layout>
      <h1>{title}</h1>
      <p>{message}</p>
      {stackTrace && <pre>{stackTrace}</pre>}
    </Layout>
  );
}

ErrorPage.propTypes = {
  title: React.PropTypes.string.isRequired,
  message: React.PropTypes.string.isRequired,
  stackTrace: React.PropTypes.string.isRequired
};

export default {

  path: '/error',

  action({ error = {} }) {
    const props = {
      title: 'Error',
      message: 'Oops, something went wrong!',
      stackTrace: process.env.NODE_ENV === 'production' ? null : error.stack
    };

    if (error.status === 404) {
      props.title = 'Page Not Found';
      props.message = 'This page does not exist.';
    }

    return {
      title: props.title,
      component: ErrorPage,
      props
    };
  }

};
