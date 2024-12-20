import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { event, eventResponseServer } from '../../Models/slot-breaks';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { studentResult } from '../../Admin/admin-home/admin-home.component';
import { IBaseResponse, IStudentInfo } from '../../Models/Admin.model';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private _url = environment.ADMIN_URL;
  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {}
  getAvailabilityRequest(): Observable<eventResponseServer> {
    const retreivedVal = sessionStorage.getItem('loggedInUser');
    let rollNo = '';
    if (retreivedVal) {
      rollNo = JSON.parse(retreivedVal).staffId;
    }
    console.log(`${this._url}/getAvailability/${rollNo}`);
    return this.http.get<eventResponseServer>(
      `${this._url}/getAvailability/${rollNo}`,
      {
        withCredentials: true,
      }
    );
  }

  postAvailabilityResponse(e: event[]) {
    const ret = sessionStorage.getItem('loggedInUser');
    let rollNo = '';

    if (ret) {
      rollNo = JSON.parse(ret);
      this.http
        .post(`${this._url}/postAvailability/${rollNo}`, e)
        .subscribe((res: any) => {
          let msg: string =
            res.message === 'Success' ? ' ✅Done' : ' ❌Could Not Update';
          this._snackBar.open(msg, '✖️' /*Actions */, {
            duration: 2000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass: 'custom-snackbar',
          });
          console.log(res);
        });
    }
  }

  getStudentList() {
    let staffId = this.getUserId();
    console.log('staffId', staffId);
    return this.http.get(environment.BOOKERS + staffId, {
      withCredentials: true,
    });
  }

  getUserId(): string | null {
    let session = sessionStorage.getItem('loggedInUser');
    return session !== null ? JSON.parse(session) : null;
  }

  studentMarks(studentmarks: studentResult[], eventType: string) {
    this.http
      .post(
        environment.STUDENTSMARKS,
        { studentmarks, eventType, staffId: this.getUserId() },
        { withCredentials: true }
      )
      .subscribe((e) => console.log(e));
  }

  getStudentInfo(identifier: string): Observable<IStudentInfo> {
    const params = new HttpParams().set('identifier', identifier);
    console.log('params');
    console.log(params);

    return this.http.get<IStudentInfo>(environment.INFORMATION_STUDENT,
      { params, withCredentials: true }
    );
  }
}
