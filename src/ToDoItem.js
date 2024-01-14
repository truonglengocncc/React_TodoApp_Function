import React from 'react';

const TodoItem = ({ id, value, changeStatus, status, remove, setEditingId, setEditingText }) => {
    const handleEditingId = (id, value) => {
        setEditingId(id);
        setEditingText(value);
    };
    return (
        <div className="todoItem">
            <div className="container">
                <input
                    type='checkbox'
                    checked={status}
                    onChange={() => changeStatus(id)}
                />
                <label
                    onDoubleClick={() => { handleEditingId(id, value) }}
                >
                    {value}
                </label>
                <>
                    <label
                        htmlFor={id}
                        className={status ? "checkedLabel" : ""}
                        onClick={() => { handleEditingId(id, value) }}
                    >
                        {value}
                    </label>
                    <label className="removeButton" onClick={() => { remove(id) }}>X</label>
                </>
            </div>
        </div>
    );
};

export default TodoItem;