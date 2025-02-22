import { Injectable } from '@angular/core';
import { BehaviorSubject,interval , takeWhile } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToastrService {
  toastArray$ = new BehaviorSubject<ToastMessage[] | null>(null);
  show: boolean = false;
  private duration = 3000;
  showToast(Message: string , isError : boolean  , icon?:string) {
    const toastMessage = new ToastMessage(Message , isError , 100 , icon ? icon : (isError ? 'error' : 'check_circle'));
    this.toastArray$.next([...this.toastArray$.value??[] , toastMessage])
    setTimeout(()=>{
      this.toastArray$.value?.shift();
    },this.duration)
  }
}
class ToastMessage {
  private message: string | null;
  private isError: boolean;
  private width: number;
  private duration = 3000;
  private iconName : string
  constructor(message: string, isError: boolean, width: number , iconName : string) {
    this.message = message;
    this.isError = isError;
    this.width = width;
    this.iconName = iconName;
    this.setToast();
  }
  setToast() {
    const now = Date.now();
    const interval$ = interval(10).pipe(
      takeWhile(() => Date.now() - now < this.duration)
    );
    const subscription = interval$.subscribe(() => {
      const elapsedTime = Date.now() - now;
      this.width = 100 - (elapsedTime / this.duration) * 100;
    });
    setTimeout(() => {
      subscription.unsubscribe();
    }, this.duration);
  }
  get IconName() {
    return this.iconName
  }
  get Message() {
    return this.message;
  }
  get IsError() {
    return this.isError;
  }
  get Width() {
    return this.width;
  }
}
