import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IToDo } from 'src/app/interfaces/todos.interface';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent {
  @Input() todo: IToDo;
  @Output() todoTextClicked: EventEmitter<IToDo> = new EventEmitter();


  onTodoTextClicked(todo: IToDo): void {
    this.todoTextClicked.emit(todo);
  }
}
