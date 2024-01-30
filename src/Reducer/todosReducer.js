import { REDUCER_ACTION } from '../constant';

const initialState = [];

const todosReducer = (state = initialState, action) => {
  switch (action.type) {
    case REDUCER_ACTION.SET_TODOS:
      return action.payload;

    case REDUCER_ACTION.ADD_TODO:
      const todoItem = {
        id: action.payload.id,
        text: action.payload.text,
        status: action.payload.status,
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

    case REDUCER_ACTION.CHANGE_REAL_ID:
      return state.map(todo =>
        todo.id === action.payload.fakeId ? { ...todo, id: action.payload.id } : todo
      );
       
    default:
      return state;
  }
};

export default todosReducer;
