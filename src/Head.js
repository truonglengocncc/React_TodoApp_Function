import React, { useState, useEffect } from 'react';

const ToDoHeader = ({ addTodoItem, editTodoItem, editingId, editingText }) => {
  const [text, setText] = useState('');

  useEffect(() => {
    setText(editingText);
  }, [editingText]);

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