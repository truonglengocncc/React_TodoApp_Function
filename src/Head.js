import React, { useRef, useEffect } from 'react';
// import './Head.css';

const ToDoHeader = ({ editingId, editValue, addTodoItem, editing }) => {
    const inputRef = useRef(null);

    useEffect(() => {
        if (editingId) {
            inputRef.current.value = editValue;
        }
    }, [editingId, editValue]);

    const handleKeyPress = (event) => {
        const { value } = inputRef.current;
        if (event.key === 'Enter') {
            if (value !== '') {
                if (editingId) {
                    editing(editingId, value);
                } else {
                    addTodoItem(value);
                }
                inputRef.current.value = '';
            }
        }
    };

    return (
        <input
            className="input"
            type="text"
            placeholder='What needs to be done?'
            ref={inputRef}
            onKeyDown={handleKeyPress}
        />
    );
};

export default ToDoHeader;
