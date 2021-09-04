
import 'materialize-css/dist/css/materialize.css'
import React from 'react';
import TodoForm from './Components/TodoForm/TodoForm'
import TodoFormik from './Components/TodoFormik/TodoFormik';
import TodoList from './Components/TodoList/TodoList'

// faire remonter la state (avoir une seule state de l'app et passer les données aux composants par props)

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      todoList: {
        todos: []
      },
      todoForm: {
        title: "",
        dueDate: "",
        complated: false
      }

    };
    this.deleteTodo = this.deleteTodo.bind(this); // garantir la valeur de this pour qu'il refere toujours à l'objet courant

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }
  loadTodos() {
    fetch('http://localhost:3300/todos').then(response => response.json())
      .then(data => this.setState({ todoList: { todos: data } }));
  }

  componentDidMount() {
    this.loadTodos();
  }
  deleteTodo(todo) {
    const url_delete = `http://localhost:3300/todos/${todo.id}`;
    fetch(url_delete, { method: 'DELETE' }).then(_ => this.loadTodos());

  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.name === 'complated' ? target.checked : target.value;
    const name = target.name;

    // reinitialiser la state
  // (setState ne merge pas sous valeurs , il fait un merge de premier niveau ) , il faut récuperer la dernier state 
    this.setState(state=>{
      const todoForm={...state.todoForm,[name]: value}
      return {todoForm};
    }
    );

  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state)
    const todo = {
      title: this.state.todoForm.title,
      dueDate: (new Date(this.state.todoForm.dueDate)).getTime(),
      complated: this.state.todoForm.complated
    };
    const url_post = 'http://localhost:3300/todos/';
    const p = fetch(url_post, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(todo)
    });
    p.then(res => this.loadTodos());
  }


  render() {
    const todos = this.state.todoList.todos;
    const todoForm = this.state.todoForm;
    return (
      <div className="container">
        <div className="row">
          <div className="col s6">
            <h1>TODO</h1>
            <TodoList todos={todos} onDelete={this.deleteTodo}></TodoList>
          </div>
          <div className="col s6">
            <h1>Form</h1>
            <TodoForm todoForm={todoForm} handleChange={this.handleInputChange} handleSubmit={this.handleSubmit}></TodoForm>
            <h1>Formik</h1>
            <TodoFormik></TodoFormik>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
