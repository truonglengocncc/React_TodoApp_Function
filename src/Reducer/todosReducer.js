import { REDUCER_ACTION } from '../constant';

const initialState = [
  { id: 1, text: 'Go to School', status: false },
  { id: 2, text: 'Go to lunch', status: false },
  { id: 3, text: 'Go to lunch 2', status: true },
];

const todosReducer = (state = initialState, action) => {
  switch (action.type) {
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
