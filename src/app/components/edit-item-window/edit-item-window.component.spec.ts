import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { EditItemWindowComponent } from './edit-item-window.component';

describe('EditItemWindowComponent', () => {
  let component: EditItemWindowComponent;
  let fixture: ComponentFixture<EditItemWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditItemWindowComponent],
      imports: [
        ReactiveFormsModule
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(EditItemWindowComponent);
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
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('component should show data via input', () => {
    expect(component.todo.id).toBe('101');
  })

  it('input initial value should be equal to component.todo.text', () => {
    const inputData = fixture.debugElement.query(By.css('#inputData'));
    expect(inputData.nativeElement.value).toBe(component.todo.text);
  })

  it('todoControl is invalid when empty', () => {
    component.todoControl.setValue('');
    expect(component.todoControl.valid).toBeFalse();
  })

  it('todoControl is valid when text length is more than 5 char', () => {
    component.todoControl.setValue('some text');
    expect(component.todoControl.valid).toBeTrue();
  })

  it('todoControl is invalid when text length is less than 5 char', () => {
    component.todoControl.setValue('1');
    let err: ValidationErrors | null = component.todoControl.errors;
    if (err) {
      expect(err['minlength']).toBeTruthy();
    }
  })

  it('save button is disabled when todoControl is invalid', () => {
    const saveButton = fixture.debugElement.query(By.css('#saveButton'))
    component.todoControl.setValue('1');
    fixture.detectChanges();
    expect(saveButton.nativeElement.disabled).toBeTruthy();
  })

  it('errors should not render if todoControl is valid', () => {
    const error = fixture.debugElement.query(By.css('#error'));
    expect(error).toBeNull();
  })

  it('errors should render if todoControl is invalid', () => {
    component.todoControl.setValue('');
    fixture.detectChanges();
    const error = fixture.debugElement.query(By.css('#error'));
    expect(error).not.toBeNull();
  })

  it('onSaveButtonClicked should emit data', () => {
    const event = spyOn(component.saveButtonClicked, 'emit');
    component.onSaveButtonClicked();
    expect(event).toHaveBeenCalledOnceWith(component.todo);
  })

  it('button click should call onSaveButtonClicked method', () => {
    const event = spyOn(component, 'onSaveButtonClicked');
    const saveButton = fixture.debugElement.query(By.css('#saveButton'));
    saveButton.nativeElement.click();
    expect(event).toHaveBeenCalledTimes(1);
  })

});
