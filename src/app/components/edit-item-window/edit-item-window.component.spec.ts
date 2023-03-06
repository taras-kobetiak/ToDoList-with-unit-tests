import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditItemWindowComponent } from './edit-item-window.component';

describe('EditItemWindowComponent', () => {
  let component: EditItemWindowComponent;
  let fixture: ComponentFixture<EditItemWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditItemWindowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditItemWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
