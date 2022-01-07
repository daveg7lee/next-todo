import { NextPage } from 'next';
import ToDoList from '../Components/ToDoList';
import { getTodosAPI } from '../lib/api/todo';
import { wrapper } from '../store';
import { todoActions } from '../store/todo';
import { ToDoType } from '../types/todo';

interface IProps {
  todos: ToDoType[];
}

const index: NextPage<IProps> = ({ todos }) => {
  return <ToDoList todos={todos} />;
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    try {
      const { data } = await getTodosAPI();
      store.dispatch(todoActions.setTodo(data));
      return { props: { todos: data } };
    } catch (e) {
      console.log(e);
      return { props: { todos: [] } };
    }
  }
);

export default index;
