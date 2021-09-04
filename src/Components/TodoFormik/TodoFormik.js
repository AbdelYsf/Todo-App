import React from 'react'
import { useFormik } from 'formik'


const validate = (values)=>{
    const errors ={};
    if(!values.title){
        errors.title ='Title is required'
    }else if(values.title.length >15){
        errors.title ='Must be 15 character or less'
    }
   
    return errors;
}
const TodoFormik = ()=>{

    const formik = useFormik({
        initialValues:{
            title:'',
            dueDate:'',
            complated:false
        },
        validate,
        onSubmit: values =>{
            alert(JSON.stringify(values,null));
            const todo = {
                title:values.title,
                dueDate: (new Date(values.dueDate)).getTime(),
                complated : values.complated
            };
            const url_post = 'http://localhost:3300/todos/';
            const p = fetch(url_post, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(todo)
            });
            p.then(res => console.log(res));
        },
    });

    return (
        <div>
        <form className="col s12" onSubmit={formik.handleSubmit}>

            <div className="row">
                <div className="input-field col s12">
                    <input type="text" name="title" placeholder="todo title" value={formik.values.title} onChange={formik.handleChange}></input>
                    {formik.errors.title ? <span class="helper-text" data-error="wrong" data-success="right">{formik.errors.title}</span> : null}
                   
                </div>
            </div>

            <div className="row">
                <div className="input-field col s12">
                    <input type="date" name="dueDate" value={formik.values.dueDate} placeholder="todo title" onChange={formik.handleChange}></input>
                   
                </div>
            </div>

            <div className="row">
                <label>
                    <input type="checkbox" className="filled-in" value={formik.values.complated} onChange={formik.handleChange} name="complated"></input>
                    <span>Filled in </span>
                    
                </label>
            </div>
            <div className="row">
                <button className="btn-small" type="submit">submit</button>
            </div>
        </form>
    </div>


    )
}

export default TodoFormik;