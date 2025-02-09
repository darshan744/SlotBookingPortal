import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment.development';
import {Observable} from 'rxjs';
import {IBaseResponse, IFileUploadError, IFileUploadSuccess} from '../../Models/Student.model';
import {IBookingStatus, ISlot} from "../../Pages/Student.interface";

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _http: HttpClient) {}

  getSlots(eventType: string) {
    const year =  JSON.parse(sessionStorage.getItem('loggedInUser')??'').year;
    const params = new HttpParams().set('year' ,year)
    return this._http.get<IBaseResponse & {data : ISlot | null | IBookingStatus}>(
      `${environment.STUDENT_SLOT}${this.getStudentId()}/${eventType}`,
      {params , withCredentials: true }
    );
  }

  getStudentId() {
    let session: any = sessionStorage.getItem('loggedInUser');
    return session ? JSON.parse(session).id : null;
  }

  bookSlot(data: { time: string; date: string; eventType: string; staff : string; venue: string , slotId : string }) {
   return this._http.post(`${environment.STUDENT_BOOKING}${data.eventType}/book`, data, { withCredentials: true })
  }
  getHistory() {
    return this._http.get(
      `${environment.STUDENT_EVENT_RESULT}${this.getStudentId()}`,
      { withCredentials: true }
    );
  }
  getEvents () {
    return this._http.get<{message : string , data : {Name:string}[] } >(`${environment.EVENT_URL}`, {withCredentials:true})
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
