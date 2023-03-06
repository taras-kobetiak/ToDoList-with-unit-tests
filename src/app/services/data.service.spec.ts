import { TestBed } from '@angular/core/testing';
import { IToDo } from '../interfaces/todos.interface';

import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataService);
    service.toDoList = [{ id: 'test1', text: 'test', completed: true }]
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('method getToDoList should return all ToDos', () => {
    const result = service.getToDoList();
    expect(JSON.stringify(result)).toBe(JSON.stringify(service.toDoList));
  })

  it('method addItem should add item to list', () => {
    const testItem: IToDo = { id: '01', text: 'some test text', completed: false };
    service.addItem(testItem);
    expect(service.toDoList).toContain(testItem);
  })

  it('method updateItem should update toDoList', () => {
    const testUpdateItem: IToDo = { id: 'test1', text: 'text updated', completed: true };
    service.updateItem(testUpdateItem);
    expect(service.toDoList).toContain(testUpdateItem);
  })

  it('method updateItem should not update other todo', () => {
    service.toDoList = [
      { id: 'test1', text: 'text updated', completed: true },
      { id: 'test2', text: 'text updated', completed: true }
    ]
    service.updateItem({ id: 'test1', text: 'text updated', completed: false });
    expect(service.toDoList).toContain({ id: 'test2', text: 'text updated', completed: true });
  })


  it('method  deleteItem should delete item from toDoList', () => {
    const testDeleteItem: IToDo = { id: 'test1', text: 'text updated', completed: true };
    service.deleteItem(testDeleteItem);
    expect(service.toDoList).not.toContain(testDeleteItem);
  })
});
