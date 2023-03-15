import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { IApi } from 'src/app/interfaces/api.innterface';
import { ObservableService } from 'src/app/services/observable.service';
import { ObservableComponent } from './observable.component';

describe('ObservableComponent', () => {
  let component: ObservableComponent;
  let fixture: ComponentFixture<ObservableComponent>;

  const fakeObservableService = jasmine.createSpyObj(['getSomeData', 'addSomeData']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ObservableComponent],
      providers: [{
        provide: ObservableService, useValue: fakeObservableService
      }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ObservableComponent);
    component = fixture.componentInstance;

    fakeObservableService.getSomeData.and.returnValue(of([]))

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('setData should return IApi array', () => {
    const fakeObj: IApi[] = [{
      id: 'some id',
      text: 'some text'
    }]
    fakeObservableService.getSomeData.and.returnValue(of(fakeObj));
    component.setData();
    expect(component.data).toEqual(fakeObj)
  })

  it('setData should return error', () => {
    fakeObservableService.getSomeData.and.returnValue(throwError('errorMessage'))
    const spy = spyOn(component, 'errorMethod')
    component.setData();
    expect(spy).toHaveBeenCalledWith('errorMessage');
  })
});
