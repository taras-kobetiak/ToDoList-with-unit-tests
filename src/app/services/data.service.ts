import { Injectable } from '@angular/core';
import { IToDo } from '../interfaces/todos.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  toDoList: IToDo[] = [
    { id: '1', text: 'first ToDo', completed: true, editMode: false },
    { id: '2', text: 'second ToDo', completed: true, editMode: false },
    { id: '3', text: 'third ToDo', completed: false, editMode: false }
  ]

  getToDoList(): IToDo[] {
    return this.toDoList;
  }

  addItem(item: IToDo): void {
    this.toDoList = this.toDoList.concat(item);
  };

  updateItem(item: IToDo): void {
    this.toDoList = this.toDoList.map((elem: IToDo) => {
      return elem.id === item.id ? item : elem;
    })
  }

  deleteItem(item: IToDo): void {
    this.toDoList = this.toDoList.filter((elem: IToDo) => elem.id !== item.id);
  }
}
