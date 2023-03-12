
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoItemComponent } from './todo-item.component';

describe('TodoItemComponent', () => {
  let component: TodoItemComponent;
  let fixture: ComponentFixture<TodoItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoItemComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TodoItemComponent);
    component = fixture.componentInstance;
    component.todo = {
      id: '101',
      text: 'testing todo-item text',
      completed: false,
      editMode: false
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Component show text via input', () => {
    component.todo = {
      id: '101',
      text: 'testing todo-item new text',
      completed: false,
      editMode: false
    };
    expect(component.todo.text).toBe('testing todo-item new text',);
  })

  it('method changeTodoStasus should emit data', () => {
    const event = spyOn(component.todoTextClicked, 'emit');
    component.onTodoTextClicked(component.todo);
    expect(event).toHaveBeenCalledWith(component.todo);
  })
});
