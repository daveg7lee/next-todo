import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ToDoType } from '../types/todo';

interface TodoReduxState {
  todos: ToDoType[];
}

const initialState: TodoReduxState = {
  todos: [],
};

const todo = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setTodo(state, action: PayloadAction<ToDoType[]>) {
      state.todos = action.payload;
    },
  },
});

export const todoActions = { ...todo.actions };

export default todo;
