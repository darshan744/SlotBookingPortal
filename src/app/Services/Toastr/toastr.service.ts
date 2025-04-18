import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BehaviorSubject,interval , takeWhile } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToastrService {
  toastArray$ = new BehaviorSubject<ToastMessage[] | null>(null);
  show: boolean = false;
  constructor(private msgService : MessageService){}
  private duration = 3000;

  showToast(Message : string , type:"success"|"info"|"error" , heading:string) {
    if(type === "success"){
      this.showSuccess(Message ,heading);
    }
    else if(type === "info") {
      this.showInfo(Message ,heading);
    }
    else {
      this.showError(Message , heading);
    }
  }
  showSuccess(msg : string ,  heading : string) {
    this.msgService.add({ summary: heading, severity: 'success', detail: msg });
  }

  showInfo(msg : string , heading : string) { this.msgService.add({ summary:heading, severity: 'info', detail: msg });}

  showError(msg:string ,  heading : string){  this.msgService.add({ summary: heading, severity: 'error', detail: msg }); }
}
class ToastMessage {
  private message: string | null;
  private isError: boolean;
  private width: number;
  private duration = 3000;
  private iconName : string;
  show : boolean = true;
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
