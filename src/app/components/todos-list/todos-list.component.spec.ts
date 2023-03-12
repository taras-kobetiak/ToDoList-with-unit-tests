import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IToDo } from 'src/app/interfaces/todos.interface';
import { DataService } from 'src/app/services/data.service';

import { TodosListComponent } from './todos-list.component';

describe('TodosListComponent', () => {
  let component: TodosListComponent;
  let fixture: ComponentFixture<TodosListComponent>;

  const fakeDataService = jasmine.createSpyObj('DataService', ['getToDoList', 'addItem', 'updateItem', 'deleteItem', 'editMode'])


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodosListComponent],
      providers: [{
        provide: DataService, useValue: fakeDataService
      }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TodosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('method  onAddButtonClicked should call dataService.addItem method', () => {
    component.onAddButtonClicked();
    expect(fakeDataService.addItem).toHaveBeenCalled();
  })

  it('method  onAddButtonClicked should call refreshData method', () => {
    const spy = spyOn(component, 'refreshData').and.callThrough();
    component.onAddButtonClicked();
    expect(spy).toHaveBeenCalled();
  })

  it('button click should call onAddButtonClicked method', () => {
    spyOn(component, 'onAddButtonClicked');
    const button = fixture.debugElement.query(By.css('.button'));
    button.nativeElement.click();
    expect(component.onAddButtonClicked).toHaveBeenCalled();
  })

  it('method refreshData should update todosList', () => {
    fakeDataService.getToDoList.and.callFake((): IToDo[] => [{ id: '2001', text: 'first ToDo', completed: true, editMode: false }])
    component.refreshData();
    expect(component.todos).toContain({ id: '2001', text: 'first ToDo', completed: true, editMode: false })
  })

  it('method updateTodoStatus should call refreshData method', () => {
    const spy = spyOn(component, 'refreshData');
    component.updateTodoStatus({ id: '2001', text: 'first ToDo', completed: true, editMode: false });
    expect(spy).toHaveBeenCalled();
  })

  it('method updateTodoStatus should call fakeDataService.updateItem method with new status', () => {
    component.updateTodoStatus({ id: '2001', text: 'first ToDo', completed: true, editMode: false });
    expect(fakeDataService.updateItem).toHaveBeenCalledWith({ id: '2001', text: 'first ToDo', completed: false, editMode: false });
  })

  it('updateTodoText should call fakeDataService.updateItem method with false editMode value', () => {
    component.updateTodoText({ id: '2001', text: 'new text', completed: true, editMode: true });
    expect(fakeDataService.updateItem).toHaveBeenCalledWith({ id: '2001', text: 'new text', completed: true, editMode: false });

  })

  it('deliteTodo should call dataService.deleteItem method', () => {
    component.deliteTodo({ id: '2001', text: 'first ToDo', completed: true, editMode: false });
    expect(fakeDataService.deleteItem).toHaveBeenCalledOnceWith({ id: '2001', text: 'first ToDo', completed: true, editMode: false });
  })

  it('editMote should call fakeDataService.updateItem method and change editMode value', () => {
    component.switchEditMode({ id: '2001', text: 'first ToDo', completed: false, editMode: false });
    expect(fakeDataService.updateItem).toHaveBeenCalledWith({ id: '2001', text: 'first ToDo', completed: false, editMode: true });
  })



});
