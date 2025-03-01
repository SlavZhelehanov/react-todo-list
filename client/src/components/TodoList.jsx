import { useEffect } from "react";
import TodoListItem from "./TodoListItem";

export default function TodoList() {
    useEffect(() => {
        fetch("http://localhost:3030/jsonstore/todos").then(res => res.json()).then(data => {
            console.log(data);
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
                    {/* <div className="loading-container">
                        <div className="loading-spinner">
                            <span className="loading-spinner-text">Loading</span>
                        </div>
                        </div> */}

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
                            <tr className="todo is-completed">
                                <td>Give dog a bath</td>
                                <td>Complete</td>
                                <td className="todo-action">
                                    <button className="btn todo-btn">Change status</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    );
}