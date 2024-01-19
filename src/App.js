import './App.css';
import ToDoHeader from './Head';
import TodoList from './ToDoList';
import Footer from './Footer';
import React, { useState, useEffect } from 'react';
import { REDUCER_ACTION } from './constant';
import { useTheme } from './ThemeProvider';
import { useSelector, useDispatch } from 'react-redux'; // Chỉ import một lần
import axios from 'axios';

const apiEndpoint = 'https://65a3ce94a54d8e805ed40481.mockapi.io/api/todos';

const App = () => {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos);
  const [action, setAction] = useState(REDUCER_ACTION.ALL);
  const { toggleTheme, theme } = useTheme();
  const [countComplete, setCountComplete] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');

  // useEffect(() => {
  //   const countComplete = todos.filter(todo => todo.status).length;
  //   setCountComplete(countComplete);
  // }, [todos]);

  useEffect(() => {
    // Gọi API để lấy danh sách todos khi component được tạo
    axios.get(apiEndpoint)
      .then(response => {
        // Dispatch action để cập nhật state trong Redux
        dispatch({ type: REDUCER_ACTION.SET_TODOS, payload: response.data });
      })
      .catch(error => console.error('Error fetching todos:', error));
  }, [dispatch]);

  const applyFilter = action => {
    setAction(action);
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
          editingId={editingId}
          editingText={editingText}
          setEditingText={setEditingText}
          setEditingId={setEditingId}
        />
        <TodoList
          todos={todos}
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