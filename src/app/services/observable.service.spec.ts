import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

import { ObservableService } from './observable.service';
import { IApi } from '../interfaces/api.innterface';
import { HttpErrorResponse } from '@angular/common/http';

describe('ObservableService', () => {
  let service: ObservableService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ObservableService]
    });
    service = TestBed.inject(ObservableService);
    httpTestingController = TestBed.get(HttpTestingController)
  });

  afterEach(() => httpTestingController.verify())

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getComeData should return some data', () => {
    const fakeData: IApi[] = [{ id: '1', text: 'some text from API' }];
    service.getSomeData().subscribe(data => {
      expect(data.length).toBe(1);
      expect(data).toEqual(fakeData);
    });
    const req = httpTestingController.expectOne(`${service.URL}`);
    expect(req.request.method).toEqual('GET');
    req.flush(fakeData);
  })

  it('getComeData should return error', (done) => {
    const message = 'Session expired'
    service.getSomeData().subscribe(
      (response) => fail('should fail with the 401 error'),
      (err: HttpErrorResponse) => {
        expect(err.status).toBe(401, 'status');
        expect(err.error).toBe(message, 'message');
        done();
      })
    const req = httpTestingController.expectOne(`${service.URL}`);
    expect(req.request.method).toBe('GET');

    req.flush(message, {
      status: 401,
      statusText: '',
    })
  })

  it('addComeData should return array with new item', () => {
    const fakeData: IApi[] = [{ id: '1', text: 'some text from API' }];
    const newItem: IApi = { id: '1', text: 'some text from API' };
    service.addSomeData(newItem).subscribe(data => {
      expect(data).toEqual(fakeData);
    })
    const req = httpTestingController.expectOne(`${service.URL}`);
    expect(req.request.method).toEqual('POST');
    req.flush(fakeData);
  })
});
