export default function TodoListItem({ todo }) {
    const changeClassName = todo.isCompleted ? "todo is-completed" : "todo";

    return (
        <tr className={changeClassName}>
            <td>{todo.text}</td>
            <td>{todo.isCompleted ? "Complete" : "Incomplete"}</td>
            <td className="todo-action">
                <button className="btn todo-btn">Change status</button>
            </td>
        </tr>
    );
}