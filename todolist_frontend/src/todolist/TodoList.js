import React, { Component } from 'react';
import './TodoList.css';
import { Redirect } from 'react-router-dom'
import { deleteTodoList } from '../util/APIUtils';
import { addTodoList } from '../util/APIUtils';
import { getTodoItems } from '../util/APIUtils';
import { getTodoLists } from '../util/APIUtils';


class TodoListBody extends Component {
  render () {
    var items = this.props.items.map((item, index) => {
      return (
        <TodoListItem key={index} item={item} index={index} removeItem={this.props.removeItem} openTodoList={this.props.openTodoList} />
      );
    });
    return (
      <ul className="list-group"> {items} </ul>
    );
  }
}
  
class TodoListItem extends Component {
  constructor(props) {
    super(props);
    this.onClickClose = this.onClickClose.bind(this);
    this.onClickOpen = this.onClickOpen.bind(this);
  }
  onClickClose() {
    var index = parseInt(this.props.index,10);
    this.props.removeItem(index);
  }
  onClickOpen() {
    var index = parseInt(this.props.index,10);
    this.props.openTodoList(index);
  }
  render () {
    var todoClass = "open";
    var iconClass = "glyphicon glyphicon-folder-open icon";
    return(
      <li className="list-group-item ">
        <div className={todoClass}>
          <span onClick={this.onClickOpen}>
            
          <span className={iconClass} aria-hidden="true" ></span>
          {this.props.item.value}
          </span>
          <button type="button" className="close" onClick={this.onClickClose}>&times;</button>
        </div>
      </li>     
    );
  }
}

class TodoListForm extends Component {
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
        <input type="text" ref="itemName" className="form-control" placeholder="add a new todo list ..."/>
        <button type="submit" className="btn btn-default">Add</button> 
      </form>
    );   
  }
}
  
class TodoListHeader extends Component {
  render () {
    return <h1>Todo list</h1>;
  }
}
  
var todoItems = [];
var todoLists = [];
var todoListId = 0;
class TodoList extends Component {
  constructor (props) {
    super(props);

    this.state = {todoLists: [], todoItems: todoItems};

  const getTodoItemsRequest = Object.assign({}, this.state)
    getTodoLists(getTodoItemsRequest)
    .then(data => 
      {
        this.setState({todoLists: data});

        todoLists = [];
        this.state.todoLists.forEach(function (todoList) {
          todoLists.unshift({
            listId: todoListId,
            index: todoLists.length+1, 
            id: todoList.id,
            value: todoList.name, 
        });
      });
      }
    )     

    
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.openTodoList = this.openTodoList.bind(this);
  }

  componentDidMount(){
    
  }

  componentWillUnmount(){
  }

  addItem(todoItemValue) {
    const addTodoItemRequest = Object.assign({}, this.state)
    addTodoList(addTodoItemRequest, todoListId, todoItemValue.newItemValue)
    .then(data => 
    {
        todoLists.unshift({
            index: this.state.todoLists.length+1, 
            id: data.id,
            value: todoItemValue.newItemValue, 
        });
        this.setState({todoLists: todoLists});
    }
    )
    // const getTodoItemsRequest = Object.assign({}, this.state)
    // getTodoItems(getTodoItemsRequest, todoListId)
    // .then(data => todoLists: data)
  }
  removeItem (itemIndex) {
    var todo = todoLists[itemIndex];

    if(todo.id !== 0)
    {
        const deleteTodoItemRequest = Object.assign({}, this.state)
        deleteTodoList(deleteTodoItemRequest, todo.id);
    }

    todoLists.splice(itemIndex, 1);
    this.setState({todoLists: todoLists});
  }       
  openTodoList(itemIndex) {
    var todo = todoLists[itemIndex];
    console.log(todo);
    todoListId = todo.id;
    todoItems = [];
    const getTodoItemsRequest = Object.assign({}, this.state)
    getTodoItems(getTodoItemsRequest, todo.id)
    // .then(data => this.setState({todoItems: data}));
    .then(data => 
      {
        data.forEach(function (todoItem) {
          todoItems.unshift({
            listId: todoListId,
            index: todoItems.length+1, 
            id: todoItem.id,
            value: todoItem.name, 
            done: todoItem.completed
        });
        console.log(todoItem);
      });
      
    this.setState({ fireRedirect: true });
    });

    // .then(data => 
    //   {
    //     data.forEach(function (todoItem) {
    //       todoItems.unshift({
    //         listId: todoListId,
    //         index: todoItems.length+1, 
    //         id: todoItem.id,
    //         value: todoItem.name, 
    //         done: todoItem.completed
    //     });
    //   });
    // });
    
  }
  render() {
    const { fireRedirect } = this.state
    return (
      <div id="main">
        <TodoListHeader />
        <TodoListBody items={todoLists} removeItem={this.removeItem} openTodoList={this.openTodoList}/>
        <TodoListForm addItem={this.addItem} />
        {fireRedirect && (
                    <Redirect to={{pathname: '/todoitem', state: {todoItems: todoItems, listId: todoListId }}}/>
                )}
      </div>
    );
  }
}


export default TodoList