import React, { useState, useEffect } from 'react';
import { REDUCER_ACTION } from './constant';
import { useDispatch } from 'react-redux'; 

const ToDoHeader = ({ editingId, editingText, setEditingId, setEditingText }) => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    setText(editingText);
  }, [editingText]);

  const addTodoItem = (text) => {
    dispatch({ type: REDUCER_ACTION.ADD_TODO, payload: { text } });
  };

  const editTodoItem = (id, text) => {
    dispatch({ type: REDUCER_ACTION.EDIT_TODO, payload: { id, text } });
    setEditingId(null);
    setEditingText('');
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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add todo..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">{editingId !== null ? 'Edit' : 'Add'}</button>
    </form>
  );
};

export default ToDoHeader;