import React from 'react';
import Layout from '../layout/Layout.js';

/*
 * Example of a stateless react component
 */
const About = function About() {
  return (
    <Layout>
      <h1>About</h1>
      <div>
        Use this service to bind multiple documents into either a single PDF or ZIP.
      </div>
    </Layout>
  );
};

export default About;
