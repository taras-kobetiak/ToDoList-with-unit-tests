import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs';
import { IToDo } from 'src/app/interfaces/todos.interface';

@Component({
  selector: 'app-edit-item-window',
  templateUrl: './edit-item-window.component.html',
  styleUrls: ['./edit-item-window.component.scss']
})
export class EditItemWindowComponent implements OnInit {
  @Input() todo: IToDo;

  @Output() saveButtonClicked: EventEmitter<IToDo> = new EventEmitter<IToDo>();
  @Output() cancelButtonClicked: EventEmitter<IToDo> = new EventEmitter<IToDo>();

  todoControl: FormControl;

  ngOnInit(): void {
    this.todoControl = new FormControl(this.todo.text, [Validators.required, Validators.minLength(5)]);
  }

  onSaveButtonClicked(): void {
    console.log(1);

    this.todo.text = this.todoControl.value;
    this.saveButtonClicked.emit(this.todo);
  }

  onCancelButtonClicked(): void {
    this.cancelButtonClicked.emit(this.todo);
  }
}
