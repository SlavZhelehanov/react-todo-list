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

    function statusChangeHandler(todoId) {
        setTodos(prev => prev.map(todo => {
            if (todo._id === todoId) {
                todo.isCompleted = !todo.isCompleted;
                // fetch(`http://localhost:3030/jsonstore/todos/${todoId}`, {
                //     method: "put",
                //     headers: { "Content-Type": "application/json" },
                //     body: JSON.stringify(todo)
                // }).catch(err => console.log(err.message));
            }

            return todo;
        }));
    }

    function generateRandomString(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; // Character set to choose from
        let result = '';
        
        for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          result += characters[randomIndex];
        }
        
        return result;
      }

    function handleAddingNewTodo(e) {
        const newTodoText = document.getElementById("newTodo");

        if (!newTodoText.value) return;

        const newTodo = {
            _id: generateRandomString(8),
            text: newTodoText.value,
            isCompleted: false
        };

        setTodos(prev => [...prev, newTodo]);        

        fetch("http://localhost:3030/jsonstore/todos", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newTodo)
        }).then(res => res.json()).then(data => {
            setTodos(prev => [...prev, data]);
            newTodoText.value = "";
        }).catch(err => console.log(err.message));
    }

    return (
        <>
            <section className="todo-list-container">
                <h1>Todo List</h1>

                <div className="add-btn-container">
                    <input type="text" name="newTodo" id="newTodo" placeholder="TODO..." />
                    <button onClick={handleAddingNewTodo} className="btn">+ Add new Todo</button>
                    <hr />
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
                            {todos.map(todo => <TodoListItem key={todo._id} todo={todo} onStatusChange={statusChangeHandler} />)}
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    );
}