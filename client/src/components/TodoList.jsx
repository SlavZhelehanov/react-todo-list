import { useEffect, useState } from "react";

import TodoListItem from "./TodoListItem";

export default function TodoList() {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:3030/jsonstore/todos").then(res => res.json()).then(data => {
            for (const key in data) setTodos(prev => [...prev, data[key]]);
            setLoading(false);
        }).catch(err => console.log(err.message))
    }, []);

    return (
        <>
            <section className="todo-list-container">
                <h1>Todo List</h1>

                <div className="add-btn-container">
                    <button className="btn">+ Add new Todo</button>
                </div>

                <div className="table-wrapper">
                    {/* <!-- Loading spinner - show the load spinner when fetching the data from the server--> */}
                    {loading && <div className="loading-container">
                        <div className="loading-spinner">
                            <span className="loading-spinner-text">Loading</span>
                        </div>
                    </div>}


                    {/* <!-- Todo list table --> */}

                    <table className="table">
                        <thead>
                            <tr>
                                <th className="table-header-task">Task</th>
                                <th className="table-header-status">Status</th>
                                <th className="table-header-action">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* <!-- Todo item --> */}
                            {todos.map(todo => <TodoListItem key={todo._id} todo={todo} />)}
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    );
}