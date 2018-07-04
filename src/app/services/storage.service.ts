import { Injectable } from '@angular/core';
import {TodoDataService} from '../todo-data.service';
import {Todo} from '../todo';

const storageName = 'aah_todo_list';

const defaultList = [
  { title: 'install NodeJS' },
  { title: 'install Angular CLI' },
  { title: 'create new app' },
  { title: 'serve app' },
  { title: 'develop app' },
  { title: 'deploy app' },
];

@Injectable()
export class StorageService {

    private TodoDataService;

  constructor() {
    this.TodoDataService = JSON.parse(localStorage.getItem(storageName)) || defaultList;
  }

  // get items
  get() {
    return [...this.TodoDataService];
  }

  private update() {
    localStorage.setItem(storageName, JSON.stringify(this.TodoDataService));

    return this.get();
  }

  // add a new item
  post(item) {
    this.TodoDataService.push(item);
    return this.update();
  }

  // update an item
  put(item, changes) {
    Object.assign(this.TodoDataService[this.findItemIndex(item)], changes);
    return this.update();
  }

  // remove an item
  destroy(item) {
    this.TodoDataService.splice(this.findItemIndex(item), 1);
    return this.update();
  }
  
   private findItemIndex(item) {
    return this.TodoDataService.indexOf(item);
  }

}