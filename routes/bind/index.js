import { BindTask } from '../../components';


export default {

  path: '/bind/:id',

  async action({ params }) {
    // const resp = await fetch(`/api/posts/${params.id}`);
    // const data = await resp.json();
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
