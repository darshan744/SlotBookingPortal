import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { IFileUploadError, IFileUploadSuccess } from '../../Models/Student.model';

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
    let studentId = session ? JSON.parse(session).studentId : null;
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
  getEvents () {
    return this._http.get<{message : string , data : {Name:string}[] } >(`${environment.EVENTURL}`, {withCredentials:true})
  }
  fileUpload(file : File) : Observable<IFileUploadSuccess | IFileUploadError> {
    const formData : FormData = new FormData();
    formData.append('file', file);
   return this._http.post<IFileUploadSuccess | IFileUploadError>(environment.FILE_UPLOAD , formData , {withCredentials : true})
  }
  fileDelete(fileName : string)  {
    const params : HttpParams = new HttpParams().set('fileName' ,fileName )
    console.log(params);
   return this._http.delete(environment.FILE_UPLOAD , {params , withCredentials : true});
  }
}
