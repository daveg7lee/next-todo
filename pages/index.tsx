import { NextPage } from 'next';
import ToDoList from '../Components/ToDoList';
import { getTodosAPI } from '../lib/api/todo';
import { wrapper } from '../store';
import { todoActions } from '../store/todo';

const index: NextPage = () => {
  return <ToDoList />;
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    try {
      const { data } = await getTodosAPI();
      store.dispatch(todoActions.setTodo(data));
      return { props: {} };
    } catch (e) {
      console.log(e);
      return { props: {} };
    }
  }
);

export default index;
