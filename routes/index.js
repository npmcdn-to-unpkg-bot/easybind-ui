import home from './home';
import error from './error';
import bind from './bind';
import about from './about';

const routes = {

  path: '/',

  children: [
    home,
    bind,
    about,
    error
  ]

};

export default routes;
