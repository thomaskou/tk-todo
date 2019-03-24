import React, { Component } from 'react';
import './App.css';

class ListItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      task: this.props.task
    }
  }

  render() {
    return (
      <div class="ListItemContainer">
        <div class="ListItem">
          <div class="ListItemText">{ this.state.task }</div>
        </div>
        <div class="ListItemBg"></div>
      </div>
    );
  }

}

class TodoList extends Component {

  constructor(props) {
    super(props);
    this.state = {itemList: []};
  }

  addTodoItem = (todo) => {
    this.setState({itemList: [...this.state.itemList, todo]});
  }

  render() {
    return (
      <div>
        {this.state.itemList.map( listItem => <ListItem task={listItem.task} /> )}
      </div>
    );
  }

}

class AddTodo extends Component {

  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.handleSubmit(this.state.value);
    this.setState({value: ''});
  }

  render() {
    return (
      <form id="AddTodo" onSubmit={this.handleSubmit}>
        <label>
          <input id="AddTodoInput" type="text" value={this.state.value} onChange={this.handleChange} placeholder="What do I need to do?" />
        </label>
        <input id="AddTodoSubmit" type="submit" value="+" />
      </form>
    );
  }

}

class App extends Component {

  todoList = null;

  constructor(props) {
    super(props);
    this.todoList = React.createRef();
    this.newTodoItem = this.newTodoItem.bind(this);
  }

  newTodoItem(value) {
    /*alert('alert: ' + value);*/
    var newTodo = {
      task: value
    }
    this.todoList.current.addTodoItem(newTodo);
  }

  render() {
    return (
      <div id="App">
        <TodoList ref={this.todoList} />
        <AddTodo handleSubmit={this.newTodoItem}/>
      </div>
    );
  }

}

export default App;
