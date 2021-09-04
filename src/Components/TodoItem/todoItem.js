import 'materialize-css/dist/css/materialize.css'

function TodoItem(props) {
    const todo = props.todo;

  return (
    <tr className={todo.completed ? "blue" : ""}>
        <td>{todo.id}</td>
        <td>{todo.title}</td>
        <td>{todo.completed  ? "Done" : "Not Done"}</td>
        <td>{todo.dueDate}</td>
        <td>
            <button className="btn-small" onClick={ _ => props.onDelete(todo)}>delete</button>
        </td>

    </tr>
  );
}

export default TodoItem;
