import React, { Component } from 'react';
import './TodoItem.css';
import { deleteTodoItem } from '../util/APIUtils';
import { addTodoItem } from '../util/APIUtils';
import { updateTodoItem } from '../util/APIUtils';
// import { getTodoItems } from '../util/APIUtils';


class TodoItemBody extends Component {
  render () {
    var items = this.props.items.map((item, index) => {
      return (
        <TodoItemListItem key={index} item={item} index={index} removeItem={this.props.removeItem} markTodoDone={this.props.markTodoDone} />
      );
    });
    return (
      <ul className="list-group"> {items} </ul>
    );
  }
}
  
class TodoItemListItem extends Component {
  constructor(props) {
    super(props);
    this.onClickClose = this.onClickClose.bind(this);
    this.onClickDone = this.onClickDone.bind(this);
  }
  onClickClose() {
    var index = parseInt(this.props.index,10);
    this.props.removeItem(index);
  }
  onClickDone() {
    var index = parseInt(this.props.index,10);
    this.props.markTodoDone(index);
  }
  render () {
    var todoClass = this.props.item.done ? 
        "done" : "undone";
    var iconClass = this.props.item.done ? 
            "glyphicon glyphicon-ok icon" : "glyphicon glyphicon-minus icon";
    return(
      <li className="list-group-item ">
        <div className={todoClass}>
          <span className={iconClass} aria-hidden="true" onClick={this.onClickDone}></span>
          {this.props.item.value}
          <button type="button" className="close" onClick={this.onClickClose}>&times;</button>
        </div>
      </li>     
    );
  }
}

class TodoForm extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    this.refs.itemName.focus();
  }
  onSubmit(event) {
    event.preventDefault();
    var newItemValue = this.refs.itemName.value;
    
    if(newItemValue) {
      this.props.addItem({newItemValue});
      this.refs.form.reset();
    }
  }
  render () {
    return (
      <form ref="form" onSubmit={this.onSubmit} className="form-inline">
        <input type="text" ref="itemName" className="form-control" placeholder="add a new todo item..."/>
        <button type="submit" className="btn btn-default">Add</button> 
      </form>
    );   
  }
}
  
class TodoHeader extends Component {
  render () {
    return <h1>Todo list items</h1>;
  }
}
  
var todoItems = [];
var todoListId = 0;
class TodoItem extends Component {
  constructor (props) {
    super(props);

    
    todoListId = this.props.location.state.listId; 

    this.state = {todoItems: this.props.location.state.todoItems, todoItem: {}};
    
    // .then(data => todoItems = data)
    // todoItems = this.state.todoItems; y
    todoItems = this.state.todoItems;
  //   this.state.todoItems.forEach(function (todoList) {
  //     todoItems.unshift({
  //       listId: todoListId,
  //       index: todoItems.length+1, 
  //       id: todoList.id,
  //       value: todoList.name, 
  //       done: todoList.completed
  //   });
  // });
    
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.markTodoDone = this.markTodoDone.bind(this);
  }

  componentDidMount(){
    
  }

  componentWillUnmount(){
  }

  addItem(todoItemValue) {
    const addTodoItemRequest = Object.assign({}, this.state)
    addTodoItem(addTodoItemRequest, todoListId, todoItemValue.newItemValue)
    .then(data => 
    {
        todoItems.unshift({
            listId: todoListId,
            index: this.state.todoItems.length+1, 
            id: data.id,
            value: todoItemValue.newItemValue, 
            done: false
        });
        this.setState({todoItems: todoItems});
    }
    )
    // const getTodoItemsRequest = Object.assign({}, this.state)
    // getTodoItems(getTodoItemsRequest, todoListId)
    // .then(data => todoItems: data)
  }
  removeItem (itemIndex) {
    var todo = todoItems[itemIndex];

    if(todo.id !== 0)
    {
        const deleteTodoItemRequest = Object.assign({}, this.state)
        deleteTodoItem(deleteTodoItemRequest, todo.listId, todo.id);
    }

    todoItems.splice(itemIndex, 1);
    this.setState({todoItems: todoItems});
  }       
  markTodoDone(itemIndex) {
    var todo = todoItems[itemIndex];
    todoItems.splice(itemIndex, 1);
    todo.done = !todo.done;
    todo.done ? todoItems.push(todo) : todoItems.unshift(todo);

    const updateTodoItemRequest = Object.assign({}, this.state)
    updateTodoItem(updateTodoItemRequest, todoListId, todo.id, todo.done, todo.value)

    this.setState({todoItems: todoItems});  
  }
  render() {
    return (
      <div id="main">
        <TodoHeader />
        <TodoItemBody items={todoItems} removeItem={this.removeItem} markTodoDone={this.markTodoDone}/>
        <TodoForm addItem={this.addItem} />
      </div>
    );
  }
}


export default TodoItem