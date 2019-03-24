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

  addTodoItem(value) {
    this.state.itemList.push(<ListItem task={value} />);
  }

  render() {
    return (
      <div>
        {this.state.itemList.map( listItem => <div>{listItem}</div> )}
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

  handleSubmit() {
    this.props.handleSubmit(this.state.value);
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

  constructor(props) {
    super(props);
    this.state = {todoList: <TodoList />};
    this.newTodoItem = this.newTodoItem.bind(this);
  }

  newTodoItem(value) {
    alert('alert: ' + value);
    this.state.todoList.addTodoItem(value);
  }

  render() {
    return (
      <div id="App">
        {this.state.todoList}
        <AddTodo handleSubmit={this.newTodoItem}/>
      </div>
    );
  }

}

export default App;
