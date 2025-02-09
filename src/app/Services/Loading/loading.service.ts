import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  loading : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  loading$ : Observable<boolean> = this.loading.asObservable();
  constructor() { }

  show() {
    console.log("showing");
    this.loading.next(true);
  }
  hide() {
    console.log("close");
    this.loading.next(false);
  }
}
