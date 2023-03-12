import { Component, OnInit } from '@angular/core';
import { IToDo } from 'src/app/interfaces/todos.interface';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.scss']
})
export class TodosListComponent implements OnInit {

  todos: IToDo[];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.refreshData();
  }

  updateTodoStatus(todo: IToDo) {
    todo.completed = !todo.completed;
    this.dataService.updateItem(todo);
    this.refreshData();
  }

  updateTodoText(todo: IToDo): void {
    todo.editMode = !todo.editMode;
    this.dataService.updateItem(todo);
    this.refreshData();
  }

  onAddButtonClicked(): void {
    this.dataService.addItem({ id: '12', text: 'new todo', completed: false, editMode: false });
    this.refreshData();
  }

  refreshData(): void {
    this.todos = this.dataService.getToDoList();
  }

  deliteTodo(todo: IToDo): void {
    this.dataService.deleteItem(todo);
    this.refreshData();
  }

  switchEditMode(todo: IToDo) {
    const newToDo = { ...todo };
    newToDo.editMode = !newToDo.editMode;
    this.dataService.updateItem(newToDo);
    this.refreshData();
  }
}