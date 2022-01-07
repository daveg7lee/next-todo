import axios from '.';
import { ToDoType } from '../../types/todo';

interface AddTodoAPIBody {
  text: string;
  color: ToDoType['color'];
}

export const getTodosAPI = () => axios.get<ToDoType[]>('api/todos');

export const checkTodoAPI = (id: number) => axios.patch(`api/todos/${id}`);

export const addTodoAPI = (body: AddTodoAPIBody) =>
  axios.post('/api/todos', body);

export const deleteTodoAPI = (id: number) => axios.delete(`api/todos/${id}`);
