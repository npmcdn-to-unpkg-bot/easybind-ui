const s3 = require('s3');
const AWS = require('aws-sdk');
const task = require('./task');
const proxy = require('proxy-agent');
const Federator = require('AWSFederator');

// TODO RF - pick these are as command line args?
const username = 'username';
const password = 'password';
const workspace = 'workspace';
const role = 'aws-defaultuser';
const region = 'ap-southeast-2';
const s3bucket = 'easybind-ui-uat';

AWS.config.update({
  httpOptions: {agent: proxy(`http://${username}:${password}@isaproxy.int.corp.sun:89`)} // TODO RF - Make proxy host configurable
});

module.exports = task('deploy', () => Promise.resolve()
  .then(() => require('./build'))
  .then(() => new Promise((resolve, reject) => {
    try {
      Federator.getCredentials(username, password, workspace, role, resolve);
    } catch (e) {
      reject(e);
    }
  }))
  .then((creds) => new Promise((resolve, reject) => {
    const client = s3.createClient({
      s3Options: {
        region: region,
        sslEnabled: true,
        accessKeyId: creds['AccessKey'],
        secretAccessKey: creds['SecretKey'],
        sessionToken: creds['SessionToken']
      }
    });
    const uploader = client.uploadDir({
      localDir: 'build',
      deleteRemoved: true,
      s3Params: {Bucket: s3bucket, ACL: 'public-read'}
    });
    uploader.on('error', reject);
    uploader.on('end', resolve);
  }))
);
