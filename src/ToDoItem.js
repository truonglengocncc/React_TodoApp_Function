import React from 'react';
import { BASE_API, REDUCER_ACTION } from './constant';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router';

const TodoItem = ({ id, value, status, setEditingId, setEditingText }) => {
    const navigate = useNavigate();
    const handleEditingId = (id, value) => {
        setEditingId(id);
        setEditingText(value);
        navigate("/header");
    };

    const dispatch = useDispatch();

    const changeStatus = async (id, currentStatus) => {
        try {
            await axios.put(`${BASE_API}/${id}`, { status: !currentStatus });
            dispatch({ type: REDUCER_ACTION.CHANGE_STATUS, payload: { id, status: !currentStatus } });
        } catch (error) {
            console.error('Error toggling todo status:', error);
        }
    };

    const remove = async (id) => {
        try {
            await axios.delete(`${BASE_API}/${id}`);
            dispatch({ type: REDUCER_ACTION.REMOVE_TODO, payload: { id } });
        }catch(err){
            console.log('Error to delete: ', err);
        }
    };


    return (
        <div className="todoItem">
            <div className="container">
                <input
                    type='checkbox'
                    checked={status}
                    onChange={() => changeStatus(id, status)}
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