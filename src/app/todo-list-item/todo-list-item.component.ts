import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../todo';
import {TodoDataService} from '../todo-data.service';

@Component({
  selector: 'app-todo-list-item',
  templateUrl: './todo-list-item.component.html',
  styleUrls: ['./todo-list-item.component.css']
})
export class TodoListItemComponent {
  
  
  @Input() todo: Todo; 

  @Output()
  remove: EventEmitter<Todo> = new EventEmitter();

  @Output()
  toggleComplete: EventEmitter<Todo> = new EventEmitter();

  constructor(private todoDataService: TodoDataService) {
  }

  toggleTodoComplete(todo: Todo) {
    this.toggleComplete.emit(todo);
  }

  removeTodo(todo: Todo) {
    this.remove.emit(todo);
  }
   
updateTodo(todo, newValue) {
  todo.title = newValue;
  return this.todoDataService.put(todo).then(() => {
    todo.editing = false;
    return this.todoDataService.getAllTodos();
  });
}

}