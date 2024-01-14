import './App.css';
import ToDoHeader from './Head';
import TodoList from './ToDoList';
import Footer from './Footer';
import React, { useState, useEffect } from 'react';
import { REDUCER_ACTION } from './constant';
import { useTheme } from './ThemeProvider';
import { useSelector, useDispatch } from 'react-redux'; // Chỉ import một lần


const App = () => {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos);
  const [action, setAction] = useState(REDUCER_ACTION.ALL);
  const { toggleTheme, theme } = useTheme();
  const [countComplete, setCountComplete] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');

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

  const editTodoItem = (id, text) => {
    dispatch({ type: REDUCER_ACTION.EDIT_TODO, payload: { id, text } });
    setEditingId(null);
    setEditingText('');
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
    <div className={theme}>
      <div className="App">
        <button onClick={toggleTheme}>Toggle Theme: {theme}</button>
        <h1>todos</h1>
        <ToDoHeader
          addTodoItem={addTodoItem}
          editTodoItem={editTodoItem}
          editingId={editingId}
          editingText={editingText}
        />
        <TodoList
          todos={todos}
          changeStatus={changeStatus}
          remove={remove}
          action={action}
          currentPage={currentPage}
          setEditingId={setEditingId}
          setEditingText={setEditingText}
        />
        <Footer
          applyFilter={applyFilter}
          count={countComplete}
          currentPage={currentPage}
          handlePagination={handlePagination}
        />
      </div>
    </div>
  );
};

// App.contextType = ThemeContext 
export default App;