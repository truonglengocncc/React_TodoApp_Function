import React from 'react';
import { REDUCER_ACTION } from './constant';
import { useDispatch } from 'react-redux'; 

const TodoItem = ({ id, value, status, setEditingId, setEditingText }) => {
    const handleEditingId = (id, value) => {
        setEditingId(id);
        setEditingText(value);
    };

    const dispatch = useDispatch();

    const changeStatus = (id) => {
        dispatch({ type: REDUCER_ACTION.CHANGE_STATUS, payload: { id } });
    };

    const remove = (id) => {
        dispatch({ type: REDUCER_ACTION.REMOVE_TODO, payload: { id } });
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
                    <label className="removeButton" onClick={() => { remove(id) }}>X</label>
                </>
            </div>
        </div>
    );
};

export default TodoItem;