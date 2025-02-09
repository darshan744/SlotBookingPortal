import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastrService {
  message:string= '';
  show:boolean = false;
  constructor() { }
  showToast(Message:string) {
    this.message = Message;
    this.show = true;
    console.log("showing");
    setTimeout(() => {
      console.log("dead");
      this.show = false;
    }, 3000);
  }
}
