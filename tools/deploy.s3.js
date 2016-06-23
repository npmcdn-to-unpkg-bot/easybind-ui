const s3 = require('s3');
const AWS = require('aws-sdk');
const task = require('./task');
const proxy = require('proxy-agent');
const Federator = require('AWSFederator');

AWS.config.update({
  httpOptions: { agent: proxy('http://u354444:Yenc8A32e1@isaproxy.int.corp.sun:89') }
});

module.exports = task('deploy', () => Promise.resolve()
  .then(() => require('./build'))
  .then(() => new Promise((resolve, reject) => {
    console.log('Getting credentials');
    Federator.getCredentials("u354444", "Yenc8A32e1", "W-001083",
      "aws-readonly", resolve);
  }))
  .then((creds) => new Promise((resolve, reject) => {
    console.log('Credentials');
    console.log(creds.toString('utf-8'));
    const client = s3.createClient({
      s3Options: {
        region: 'ap-southeast-2',
        sslEnabled: true,
        accessKeyId: 'ASIAISDGXZFANSH2N6DA',
        secretAccessKey: 'xqMhzdSszztk7WXyXtANONpeeAy9h6UUxPPUG8v+',
        sessionToken: 'AgoGb3JpZ2luEO///////////wEaDmFwLXNvdXRoZWFzdC0yIoACXWs7dnxZQJI+WOLJEp1XqhwlavjjZjYe0WXbnzqrta0d7M//487j8TKlbLyrGpToC1mIen5hsL9+ZKYtujR3vZWbJ8shuFFwFSjo74ufIiFCambzZGNSU7Pj60m9O9Jg6Z+Tc6Rld3cwTAOlaXdIAcr1sfa1NGM1ZyFwq1EeAYIJtdzaf0B3elf7ccDkNE3Vyd6212FCjaNC0gGER5vJ6hLJBLqtuVNH8hyDd268B3j+5TuQSRZEYipH0aaU2w3DdcetlTcrEk80OXiGIT8xRAPGROzYwPOr12sTtCUfC8YJMcAHooNmzgryGjhmQ2IGWqxgnK9RgAcKMe/a4dedBSr9AQjl//////////8BEAAaDDI5MDIwNzkzNjA5NCIMwkwS/pdLHw1J2/lQKtEBipS7Dl94HQ27zeRu2aAirHYOrgC9zPYQebt0lFlVMef+MKYQL8kU776uE6ewqoD78aOtDq1KX8CsmRUnkNHCYog4rrA3TPbaRwYAuZBWwhi0sJ222ouUcKqKdlAX2BFCmQhrSqRNnFTJMdqqHXPweIuQpXThGNrOEg7mZDYgE5iB9GJPyTM6ODRVFmoNmKHBOzotlhunWMN+7V/AV5jjRukmgqxSCKs39LWiP6hxFiHlAMtzFywoMWcFbJ2q+gj20lMJRs+J7GyD9CTQLKMS4n0wucXjugU='
      },
    });
    console.log("Starting upload directory to S3");
    const uploader = client.uploadDir({
      localDir: 'build',
      deleteRemoved: true,
      s3Params: { Bucket: 'easybind-ui-uat', ACL: 'public-read' },
    });
    uploader.on('error', reject);
    uploader.on('end', resolve);
  }))
);
