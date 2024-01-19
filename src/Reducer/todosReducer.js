import { REDUCER_ACTION } from '../constant';
import axios from 'axios';

const apiEndpoint = 'https://65a3ce94a54d8e805ed40481.mockapi.io/api/todos';

const initialState = [];

const todosReducer = (state = initialState, action) => {
  switch (action.type) {
    case REDUCER_ACTION.SET_TODOS:
      return action.payload;

    case REDUCER_ACTION.ADD_TODO:
      const newTodo = {
        text: action.payload.text,
        status: false,
      };
      axios.post(apiEndpoint, newTodo)
        .then(response => {
          const updatedState = [response.data, ...state];
          // Update state with the new todo from the server
          return updatedState;
        })
        .catch(error => console.error('Error adding todo:', error));
      return state;

    case REDUCER_ACTION.CHANGE_STATUS:
      const updatedStateChangeStatus = state.map(todo =>
        todo.id === action.payload.id ? { ...todo, status: !todo.status } : todo
      );
      const todoToUpdateChangeStatus = updatedStateChangeStatus.find(todo => todo.id === action.payload.id);
      axios.put(`${apiEndpoint}/${action.payload.id}`, todoToUpdateChangeStatus)
        .catch(error => { console.error('Error changing status:', error); return state });
      return updatedStateChangeStatus;

    case REDUCER_ACTION.EDIT_TODO:
      const updatedStateEdit = state.map(todo =>
        todo.id === action.payload.id ? { ...todo, text: action.payload.text } : todo
      );
      const todoToUpdateEdit = updatedStateEdit.find(todo => todo.id === action.payload.id);
      axios.put(`${apiEndpoint}/${action.payload.id}`, todoToUpdateEdit)
        .catch(error => { console.error('Error editing todo:', error); return state });
      return updatedStateEdit;

    case REDUCER_ACTION.REMOVE_TODO:
      const updatedStateRemove = state.filter(todo =>
        todo.id !== action.payload.id
      );
      axios.delete(`${apiEndpoint}/${action.payload.id}`)
        .catch(error => { console.error('Error removing todo:', error); return state });
      return updatedStateRemove;
    default:
      return state;
  }
};

export default todosReducer;
