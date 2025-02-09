import { Injectable } from '@angular/core';
import { BehaviorSubject,interval , takeWhile } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToastrService {
  message$ = new BehaviorSubject<string | null>(null);
  progress$ = new BehaviorSubject<number>(100);
  isError = new BehaviorSubject<boolean>(false);
  show: boolean = false;
  iconName = new BehaviorSubject('check_circle');
  private duration = 3000;


  showToast(Message: string , isError : boolean  , icon?:string) {
    if(icon !== undefined) {
      this.iconName.next(icon);
    }else {
      this.iconName.next(isError ? 'error' : 'check_circle');
    }
    this.isError.next(isError);
    this.message$.next(Message);
    this.progress$.next(100);
    const now = Date.now();
    const interval$ = interval(10).pipe(
      takeWhile(()=>Date.now() - now < this.duration)
    )
    const subscription = interval$.subscribe(()=> {
      const elapsedTime = Date.now() - now;
      this.progress$.next(100 - (elapsedTime / this.duration) * 100);
    })
    setTimeout(() => {
      this.message$.next(null);
       subscription.unsubscribe();
       this.isError.next(false) // Hide toast
    }, this.duration);
  }
}
