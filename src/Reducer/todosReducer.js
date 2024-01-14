import { REDUCER_ACTION } from '../constant';
import axios from 'axios';

const apiEndpoint = 'https://65a3ce94a54d8e805ed40481.mockapi.io/api/todos';

const initialState = [];

const todosReducer = (state = initialState, action) => {
  switch (action.type) {
    case REDUCER_ACTION.SET_TODOS:
      return action.payload;
    case REDUCER_ACTION.ADD_TODO:
      const todoItem = {
        id: state.length ? Math.max(...state.map(i => i.id)) + 1 : 0,
        text: action.payload.text,
        status: false,
      };
      return [todoItem, ...state];
    case REDUCER_ACTION.CHANGE_STATUS:
      return state.map(todo =>
        todo.id === action.payload.id ? { ...todo, status: !todo.status } : todo
      );
    case REDUCER_ACTION.EDIT_TODO:
      return state.map(todo =>
        todo.id === action.payload.id ? { ...todo, text: action.payload.text } : todo
      );
    case REDUCER_ACTION.REMOVE_TODO:
      return state.filter(todo =>
        todo.id !== action.payload.id
      );
    default:
      return state;
  }
};

export default todosReducer;
