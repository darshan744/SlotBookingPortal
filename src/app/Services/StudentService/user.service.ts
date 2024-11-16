import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})

export class UserService {
    constructor(private _http: HttpClient) { }

    getSlots (eventType : string) : Observable<any> {
        return this._http.get(`${environment.STUDENT_SLOT}${this.getStudentId()}/${eventType}`);
    }
    getStudentId() {
      let session = sessionStorage.getItem('loggedInUser');
      let studentId = session !==null ? JSON.parse(session) : null;
      return studentId;
    }
    bookSlot(data :{time : string , date :string,eventType:string , venue:string}) {
      this._http.post(`${environment.STUDENT_BOOKING}${data.eventType}/book`,
          { ...data , studentId : this.getStudentId() } ).subscribe(e=>console.log(e));
    }
    getHistory() {
     return this._http.get(`${environment.STUDENTEVENTRESULT}${this.getStudentId()}`)
    }
}
