import 'materialize-css/dist/css/materialize.css'
import React from 'react';
import TodoItem from '../TodoItem/todoItem'

function TodoList(props) {

    const todos = props.todos;

    return (
        <div className="TodoList">
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>title</th>
                        <th>completed</th>
                        <th>deuDate</th>
                        <th>actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        todos.map(todo => <TodoItem key={todo.id} todo={todo} onDelete={props.onDelete} />)
                    }

                </tbody>
            </table>
        </div>);

}
export default TodoList;
