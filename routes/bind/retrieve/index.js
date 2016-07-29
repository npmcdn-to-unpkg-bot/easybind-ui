import { RetrieveBindTask } from '../../../components';

export default {

  path: '/bind/:id',

  action({ params }) {
    const data = {
      isComplete: false,
      id: params.id
    };
    return {
      component: RetrieveBindTask,
      props: data
    };
  }
};
