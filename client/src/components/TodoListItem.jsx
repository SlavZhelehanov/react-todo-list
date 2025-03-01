export default function TodoListItem({ todo }) {
    return (
        <tr className="todo">
            <td>Vacuum floor</td>
            <td>Incomplete</td>
            <td className="todo-action">
                <button className="btn todo-btn">Change status</button>
            </td>
        </tr>
    );
}