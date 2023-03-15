import { Component, OnDestroy, OnInit } from '@angular/core';
import { catchError, Subject, takeUntil, throwError } from 'rxjs';
import { IApi } from 'src/app/interfaces/api.innterface';
import { ObservableService } from 'src/app/services/observable.service';

@Component({
  selector: 'app-observable',
  templateUrl: './observable.component.html',
  styleUrls: ['./observable.component.scss']
})
export class ObservableComponent implements OnInit, OnDestroy {

  data: IApi[]
  private unsubscribingData$: Subject<void> = new Subject<void>();

  constructor(private observableService: ObservableService) { }

  ngOnInit(): void {
    this.setData();
  }

  setData(): void {
    this.observableService.getSomeData().pipe(
      catchError((err) => throwError(err)),
      takeUntil(this.unsubscribingData$)
    ).subscribe((apiData: IApi[]) => {
      this.data = apiData;
    },
      err => this.errorMethod(err)
    )
  }

  errorMethod(err: any): void {
    console.log(err)
  }

  ngOnDestroy(): void {
    this.unsubscribingData$.next();
    this.unsubscribingData$.complete();
  }
}
