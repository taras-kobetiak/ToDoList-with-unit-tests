import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IApi } from '../interfaces/api.innterface';

@Injectable({
  providedIn: 'root'
})
export class ObservableService {

  URL: string = 'https://swapi.dev/api/peoplse/1/';

  constructor(private http: HttpClient) { }

  getSomeData(): Observable<IApi[]> {
    return this.http.get<IApi[]>(this.URL)
  }

  addSomeData(item: IApi): Observable<IApi[]> {
    return this.http.post<IApi[]>(this.URL, item);
  }
}
