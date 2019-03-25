import React, { Component } from 'react';
import './App.css';

class ListItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      task: this.props.task,
      completed: this.props.completed,
      date: this.props.date
    }
    if ((this.state.date[4] + "").length == 1) {
      this.state.date[4] = "0" + this.state.date[4];
    }
    this.handleClick = this.handleClick.bind(this);
    this.getClassType = this.getClassType.bind(this);
  }

  handleClick() {
   this.props.handleUpdate(this.state.id);
   this.setState(this.props.getState(this.state.id));
  }

  getClassType() {
    return (this.state.completed ? "ListItemDone" : "ListItem");
  }

  render() {
    return (
      <div className="ListItemContainer" onClick={this.handleClick}>
        <div className={this.getClassType()}>
          <div className="ListItemText">{ this.state.task }</div>
          <div className="ListItemDate">Made { this.state.date[1] }/{ this.state.date[2] } at { this.state.date[3] }:{ this.state.date[4] }</div>
        </div>
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

  getItemState = (id) => {
    var tempList = this.state.itemList;
    for (var k = 0; k < tempList.length; k++) {
      if (tempList[k].id == id) {
        return tempList[k];
      }
    }
    return null;
  }

  itemCompleted = (id) => {
    var tempList = this.state.itemList;
    for (var k = 0; k < tempList.length; k++) {
      if (tempList[k].id == id) {
        tempList[k].completed = !(tempList[k].completed);
        break;
      }
    }
    this.setState({itemList: tempList});
  }

  removeCompleted = () => {
    this.setState({
      itemList: this.state.itemList.filter(todo => todo.completed == false)
    });
  }

  render() {
    return (
      <div>
        {this.state.itemList.map( listItem => <ListItem key={listItem.id} id={listItem.id} task={listItem.task} completed={listItem.completed} date={listItem.date} handleUpdate={this.itemCompleted} getState={this.getItemState} /> )}
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
    if (this.state.value == '') {
      this.props.handleError("Task must be at least 1 character long.");
    } else {
      this.props.handleSubmit(this.state.value);
      this.props.handleError("");
      this.setState({value: ''});
    }
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

class TodoError extends Component {

  constructor(props) {
    super(props);
    this.state = { str: "" };
  }

  render() {
    return (
      <div id="TodoError"><i>{ this.state.str }</i></div>
    );
  }

}

class RemoveCompleted extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div id="RemoveCompleted" onClick={this.props.handleClick}>Remove completed tasks</div>
    );
  }

}

class App extends Component {

  todoList = null;
  todoError = null;

  constructor(props) {
    super(props);
    this.idIncrementer = 0;
    this.todoList = React.createRef();
    this.todoError = React.createRef();
    this.newTodoItem = this.newTodoItem.bind(this);
    this.addTodoError = this.addTodoError.bind(this);
    this.removeCompleted = this.removeCompleted.bind(this);
  }

  newTodoItem(value) {
    var d = new Date();
    var newTodo = {
      id: this.idIncrementer,
      task: value,
      completed: false,
      date: [d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes()]
    };
    this.idIncrementer++;
    this.todoList.current.addTodoItem(newTodo);
  }

  addTodoError(message) {
    this.todoError.current.setState({ str: message });
  }

  addRemoveButton() {
    return <RemoveCompleted handleClick={this.removeCompleted}/>;
  }

  removeCompleted() {
    this.todoList.current.removeCompleted();
  }

  render() {
    return (
      <div id="App">
        <p id="Title">My Todo List</p>
        {this.addRemoveButton()}
        <TodoList ref={this.todoList} />
        <AddTodo handleSubmit={this.newTodoItem} handleError={this.addTodoError} />
        <TodoError ref={this.todoError} />
      </div>
    );
  }

}

export default App;
