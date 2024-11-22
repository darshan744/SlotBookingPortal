import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _http: HttpClient) {}

  getSlots(eventType: string): Observable<any> {
    return this._http.get(
      `
        ${environment.STUDENT_SLOT}${this.getStudentId()}/${eventType}`,
      { withCredentials: true }
    );
  }
  getStudentId() {
    let session: any = sessionStorage.getItem('loggedInUser');
    console.log(JSON.parse(session).studentId);
    let studentId = session ? JSON.parse(session).studentId : null;
    console.log(studentId);
    return studentId;
  }
  bookSlot(data: {
    time: string;
    date: string;
    eventType: string;
    venue: string;
  }) {
    this._http
      .post(
        `${environment.STUDENT_BOOKING}${data.eventType}/book`,
        { ...data, studentId: this.getStudentId() },
        { withCredentials: true }
      )
      .subscribe((e) => console.log(e));
  }
  getHistory() {
    return this._http.get(
      `${environment.STUDENTEVENTRESULT}${this.getStudentId()}`,
      { withCredentials: true }
    );
  }
}
