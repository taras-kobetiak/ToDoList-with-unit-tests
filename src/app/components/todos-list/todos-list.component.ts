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
    const newToDo = { ...todo };
    newToDo.completed = !newToDo.completed;
    this.dataService.updateItem(newToDo);

    this.refreshData();
  }

  onAddButtonClicked(): void {
    this.dataService.addItem({ id: '12', text: 'new todo', completed: false })
    this.refreshData();
  }

  refreshData(): void {
    this.todos = this.dataService.getToDoList();
  }
}