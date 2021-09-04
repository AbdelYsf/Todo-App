import 'materialize-css/dist/css/materialize.css'
import React from 'react';


function TodoForm(props) { 
    const formValue = props.todoForm;

    return (
        <div>
            <form className="col s12" onSubmit={event =>props.handleSubmit(event)}>

                <div className="row">
                    <div className="input-field col s12">
                        <input type="text" name="title" placeholder="todo title" value={formValue.title} onChange={event =>props.handleChange(event)}></input>
                    </div>
                </div>

                <div className="row">
                    <div className="input-field col s12">
                        <input type="date" name="dueDate" value={formValue.dueDate} placeholder="todo title" onChange={event=>props.handleChange(event)}></input>
                    </div>
                </div>

                <div className="row">
                    <label>
                        <input type="checkbox" className="filled-in" value={formValue.complated} onChange={event=>props.handleChange(event)} name="complated"></input>
                        <span>Filled in </span>
                    </label>
                </div>
                <div className="row">
                    <button className="btn-small" type="submit">submit</button>
                </div>
            </form>
        </div>

    );


}
export default TodoForm;
