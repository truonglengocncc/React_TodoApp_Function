import './App.css';
import ToDoHeader from './Head';
import TodoList from './ToDoList';
import Footer from './Footer';
import React, { useState, useEffect, useContext } from 'react';
import { ACTION } from './constant';
import { ThemeContext } from './ThemeProvider';

const App = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Go to School', status: false },
    { id: 2, text: 'Go to lunch', status: false },
    { id: 3, text: 'Go to lunch 2', status: true },
  ]);
  const [action, setAction] = useState(ACTION.ALL);
  const [editValue, setEditValue] = useState('');
  const [editingId, setEditingId] = useState(0);
  const [countComplete, setCountComplete] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const { toggleTheme, theme } = useContext(ThemeContext);

  useEffect(() => {
    const countComplete = todos.filter(todo => todo.status).length;
    setCountComplete(countComplete);
  }, [todos]);

  const addTodoItem = item => {
    const todoItem = {
      id: todos.length ? Math.max(...todos.map(i => i.id)) + 1 : 0,
      text: item,
      status: false,
    };
    setTodos([todoItem, ...todos]);
  };

  const changeStatus = id => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, status: !todo.status } : todo
      )
    );
  };

  const editing = (id, newValue) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, text: newValue } : todo
      )
    );
    setEditingId(0);
    setEditValue('');
  };

  const remove = id => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

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
        <button onClick={toggleTheme}>Toggle Theme</button>
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
  );
};

// App.contextType = ThemeContext 
export default App;
