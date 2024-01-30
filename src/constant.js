export const ACTION = {
    ALL: 0,
    COMPLETE: 1,
    ACTIVE: 2,
  }

export const LIMIT = 5;

export const REDUCER_ACTION = { 
  ADD_TODO: 'ADD_TODO',
  EDIT_TODO: 'EDIT_TODO',
  REMOVE_TODO: 'REMOVE_TODO',
  CHANGE_STATUS: 'CHANGE_STATUS',
  SET_TODOS: 'SET_TODOS',
  CHANGE_REAL_ID: 'CHANGE_REAL_ID',
}

export const BASE_API = 'https://65a3ce94a54d8e805ed40481.mockapi.io/api/todos';