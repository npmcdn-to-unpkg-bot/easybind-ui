const GitRepo = require('git-repository');
const task = require('./task');

require('babel-polyfill');

const remote = {
  name: 'github',
  url: 'https://github.com/reecefenwick/reecefenwick.github.io.git',
  branch: 'master'
};

/**
 * Deploy the contents of the `/build` folder to GitHub Pages.
 */
module.exports = task('deploy', () => new Promise((resolve, reject) => {
  // Initialize a new Git repository inside the `/build` folder
  // if it doesn't exist yet
  let p = GitRepo.open('build', { init: true });
  p = p.then(repo => {
    p = p.then(() => repo.setRemote(remote.name, remote.url));
    p = p.then(() => repo.hasRef(remote.url, remote.branch).then(exists => {
      if (exists) {
        p = p.then(() => repo.fetch(remote.name));
        p = p.then(() => repo.reset(`${remote.name}/${remote.branch}`, { hard: true }));
        p = p.then(() => repo.clean({ force: true }));
      }
    }));

    // Build the project in RELEASE mode which
    // generates optimized and minimized bundles
    process.argv.push('release');
    p = p.then(() => require('./build').default);

    // Push the contents of the build folder to the remote server via Git
    p = p.then(() => repo.add('--all .'));
    p = p.then(() => repo.commit(`Update ${new Date().toISOString()}`));
    p = p.then(() => repo.push(remote.name, `master:${remote.branch}`));

    resolve(p);
  });

  p.catch(reject);
}));

// import GitRepo from 'git-repository';
// import task from './lib/task';

// TODO: Update deployment URL
// const remote = {
//   name: 'github',
//   url: 'https://github.com/reecefenwick/reecefenwick.github.io.git',
//   branch: 'master',
// };

/**
 * Deploy the contents of the `/build` folder to GitHub Pages.
 */
// export default task(async function deploy() {
//   // Initialize a new Git repository inside the `/build` folder
//   // if it doesn't exist yet
//   const repo = await GitRepo.open('build', { init: true });
//   await repo.setRemote(remote.name, remote.url);
//
//   // Fetch the remote repository if it exists
//   if ((await repo.hasRef(remote.url, remote.branch))) {
//     await repo.fetch(remote.name);
//     await repo.reset(`${remote.name}/${remote.branch}`, { hard: true });
//     await repo.clean({ force: true });
//   }
//
//   // Build the project in RELEASE mode which
//   // generates optimized and minimized bundles
//   process.argv.push('release');
//   await require('./build')();
//
//   // Push the contents of the build folder to the remote server via Git
//   await repo.add('--all .');
//   await repo.commit('Update ' + new Date().toISOString());
//   await repo.push(remote.name, 'master:' + remote.branch);
// });
