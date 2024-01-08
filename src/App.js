import './App.css';
import ToDoHeader from './Head';
import TodoList from './ToDoList';
import Footer from './Footer';
import React, { useState, useEffect } from 'react';
import { REDUCER_ACTION } from './constant';
import { useTheme } from './ThemeProvider';
import { Provider, useSelector, useDispatch } from 'react-redux'; // Chỉ import một lần
import store from './Reducer/store';


const App = () => {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos);
  const [action, setAction] = useState(REDUCER_ACTION.ALL);
  const [editValue, setEditValue] = useState('');
  const { toggleTheme, theme } = useTheme();
  const [countComplete, setCountComplete] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  

  useEffect(() => {
    const countComplete = todos.filter(todo => todo.status).length;
    setCountComplete(countComplete);
  }, [todos]);

  const applyFilter = action => {
    setAction(action);
  };


  const addTodoItem = (text) => {
    dispatch({ type: REDUCER_ACTION.ADD_TODO, payload: { text } });
  };

  const changeStatus = (id) => {
    dispatch({ type: REDUCER_ACTION.CHANGE_STATUS, payload: { id } });
  };

  const remove = (id) => {
    dispatch({ type: REDUCER_ACTION.REMOVE_TODO, payload: { id } });
  };

  const setEditingId = (id, text) => {
    dispatch({ type: REDUCER_ACTION.EDIT_TODO, payload: { id , text} });
  };

  const handlePagination = currentPage => {
    const length = todos.length;
    if (currentPage <= 0) {
      currentPage = 1;
    } else if (currentPage > length) {
      currentPage = length;
    }
    setCurrentPage(currentPage);
  };

  return (
    <Provider store={store}>
    <div className={theme}>
      <div className="App">
        <button onClick={toggleTheme}>Toggle Theme: {theme}</button>
        <h1>todos</h1>
        <ToDoHeader
          addTodoItem={addTodoItem}
          editingId={editingId}
          editing={editing}
          editValue={editValue}
        />
        <TodoList
          todos={todos}
          changeStatus={changeStatus}
          editing={editing}
          remove={remove}
          action={action}
          setEditingId={setEditingId}
          currentPage={currentPage}
        />
        <Footer
          applyFilter={applyFilter}
          count={countComplete}
          currentPage={currentPage}
          handlePagination={handlePagination}
        />
      </div>
    </div>
    </Provider>
  );
};

// App.contextType = ThemeContext 
export default App;