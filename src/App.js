import './App.css';
import ToDoHeader from './Head';
import TodoList from './ToDoList';
import Footer from './Footer';
import React, { useState, useEffect } from 'react';
import { BASE_API, LIMIT, REDUCER_ACTION } from './constant';
import { useTheme } from './ThemeProvider';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { Routes, Route, Outlet, Link } from "react-router-dom";

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
    const fetchData = async () => {
      try {
        const response = await axios.get(BASE_API);
        dispatch({ type: REDUCER_ACTION.SET_TODOS, payload: response.data });
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const completedCount = todos.filter(todo => todo.status).length;
    setCountComplete(completedCount);
  }, [todos]);

  const applyFilter = (action) => {
    setAction(action);
  };

  const handlePagination = (currentPage) => {
    const maxCount = Math.ceil(todos.length / LIMIT);
    currentPage = parseInt(currentPage, 10);

    if (currentPage <= 0 || isNaN(currentPage)) {
      currentPage = 1;
    } else if (currentPage > maxCount) {
      currentPage = maxCount;
    }

    setCurrentPage(currentPage);
  };

  return (
    <div className={theme}>
      <div className="App">
        <button onClick={toggleTheme}>Toggle Theme: {theme}</button>
        <h1>todos</h1>
        <Routes>
          <Route path="/header" element={<Outlet />}>
            <Route index element={<ToDoHeader
              editingId={editingId}
              editingText={editingText}
              setEditingText={setEditingText}
              setEditingId={setEditingId}
            />} />
          </Route>

          <Route
            path="/"
            element={ 
              <div>
                <br></br>
                <Link to="/header">Add todo</Link>
                <hr/>
                <br></br>
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
            }
          />
        </Routes>

      </div>
    </div>
  );
};


export default App;