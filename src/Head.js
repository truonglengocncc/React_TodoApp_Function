import React, { useState, useEffect } from 'react';
import { BASE_API, REDUCER_ACTION } from './constant';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ToDoHeader = ({ editingId, editingText, setEditingId, setEditingText }) => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    setText(editingText);
  }, [editingText]);

  const addTodoItem = (text) => {
    const fakeId = Date.now();

    let newData = { id: fakeId, text, status: false };
    dispatch({ type: REDUCER_ACTION.ADD_TODO, payload: newData });

    axios.post(BASE_API, newData)
      .then(response => {
        let { data } = response;
        dispatch({ type: REDUCER_ACTION.CHANGE_REAL_ID, payload: { fakeId, ...data } });
      })
      .catch(error => {
        console.error('Error adding todo:', error);

        dispatch({ type: REDUCER_ACTION.REMOVE_TODO, payload: fakeId });
      });
  };

  const editTodoItem = (id, text) => {
    axios.put(`${BASE_API}/${id}`, { text })
      .then(response => {
        let { id, text } = response.data;
        dispatch({ type: REDUCER_ACTION.EDIT_TODO, payload: { id, text } });
        setEditingId(null);
        setEditingText('');
      })

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() !== '') {
      if (editingId !== null) {
        // Nếu đang chỉnh sửa, gọi hàm editTodoItem
        editTodoItem(editingId, text);
      } else {
        // Ngược lại, gọi hàm addTodoItem
        addTodoItem(text);
      }
      setText('');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add todo..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">{editingId !== null ? 'Edit' : 'Add'}</button>
      </form>
      <Link to="/">Go back</Link>
    </>
  );
};

export default ToDoHeader;