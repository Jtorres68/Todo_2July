import {Injectable} from '@angular/core';
import {Todo} from './todo';

@Injectable()
export class TodoDataService {

  // Placeholder for last id so we can simulate
  // automatic incrementing of ids
  lastId: number;

  // Placeholder for todos
  public data: Array<any> =[];

  constructor() {
    let todos = this.getAllTodos();
    
    if (todos.length == 0) {
      this.lastId = 0;
    } else {
      let maxId = todos[todos.length-1].id;
      this.lastId = maxId + 1;
    }
  }

  // Simulate POST /todos
  addTodo(todo: Todo): TodoDataService {
    if (!todo.id) {
      todo.id = ++this.lastId;
    }
    
    let todos = this.getAllTodos();
    todos.push(todo);
    
    this.setLocalStorageTodos(todos);
    return this;
  }

  // Simulate DELETE /todos/:id
  deleteTodoById(id: number): void {
    let todos = this.getAllTodos();
    todos = todos
      .filter(todo => todo.id != id);
    this.setLocalStorageTodos(todos);
    
  }

  // Simulate PUT /todos/:id
  updateTodoById(id: number, values: Object = {}): Todo {
    let todo = this.getTodoById(id);
    
    if (!todo) {
      return null;
    }
    
    Object.assign(todo, values);
    return todo;
  }

  // Simulate GET /todos
  getAllTodos(): Todo[] {
    let localStorageItem = JSON.parse(localStorage.getItem('todos'));
    return localStorageItem == null ? [] : localStorageItem.todos;
  }

  // Simulate GET /todos/:id
  getTodoById(id: number): Todo {
  let todos = this.getAllTodos();
  return todos
     .filter(todo => todo.id === id)
     .pop();
      
  }

  // Toggle todo complete
  toggleTodoComplete(todo: Todo){
  let updatedTodo = this.updateTodoById(todo.id, {
     complete: !todo.complete
   });
   return updatedTodo;
  }
  
//Grab the index of the todo and update Todo list (worked before local storage)  
put(data) {
let todos = this.getAllTodos();
  return new Promise(resolve => {
    let index = todos.findIndex(todo => todo.id === data.id);
    todos[index].title = data.title;
    resolve(data);
  });
}


  private setLocalStorageTodos(todos: Todo[]): void {
    localStorage.setItem('todos', JSON.stringify({ todos: todos }));
  }
}