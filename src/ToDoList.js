import React from "react";
import TodoItem from "./ToDoItem";
// import './ToDoList.css';
import { ACTION, LIMIT } from "./constant";

const TodoList = ({ todos, action, currentPage, setEditingId, setEditingText }) => {
    const indexOfLastItem = currentPage * LIMIT;
    const indexOfFirstItem = indexOfLastItem - LIMIT;

    let currentTodos = todos;

    if (action !== ACTION.ALL) {
        currentTodos = todos.filter(item => item.status === (action === ACTION.COMPLETE)).slice(indexOfFirstItem, indexOfLastItem);
    } else {
        currentTodos = todos.slice(indexOfFirstItem, indexOfLastItem);
    }

    return (
        <div className="ListTodoItem">
            {currentTodos.map(item => (
                <TodoItem
                    key={item.id}
                    id={item.id}
                    value={item.text}
                    status={item.status}
                    setEditingId={setEditingId}
                    setEditingText={setEditingText}
                />
            ))}
        </div>
    );
};

export default TodoList;
