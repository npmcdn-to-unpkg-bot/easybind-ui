import home from './home';
import error from './error';
import createBindTask from './bind/create';
import retrieveBindTask from './bind/retrieve';
import about from './about';

const routes = {

  path: '/',

  children: [
    home,
    createBindTask,
    retrieveBindTask,
    about,
    error
  ]

};

export default routes;
