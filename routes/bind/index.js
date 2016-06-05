import { BindTask } from '../../components';

export default {

  path: '/bind/:id',

  action({ params }) {
    const data = {
      isComplete: false,
      id: params.id
    };
    return {
      component: BindTask,
      props: data
    };
  }
};
