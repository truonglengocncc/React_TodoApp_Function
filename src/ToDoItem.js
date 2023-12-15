import React from 'react';
// import './TodoItem.css';

const TodoItem = ({ id, value, changeStatus, status, remove, setEditingId }) => {
    const handleEditingId = (id, value) => {
        setEditingId(id, value);
    };

    return (
        <div className="todoItem">
            <div className="container">
                <input
                    type='checkbox'
                    checked={status}
                    onChange={() => changeStatus(id)}
                />
                <>
                    <label
                        htmlFor={id}
                        className={status ? "checkedLabel" : ""}
                        onClick={() => { handleEditingId(id, value) }}
                    >
                        {value}
                    </label>
                    <label onClick={() => { remove(id) }}>X</label>
                </>
            </div>
        </div>
    );
};

export default TodoItem;
