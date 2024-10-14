import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { event,eventResponseServer} from '../../Models/slot-breaks'
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {


  router = inject(ActivatedRoute)
  private _url = environment.ADMIN_URL;
  constructor(private  http : HttpClient) { }
  getAvailabilityRequest(): Observable<eventResponseServer> {
    const retreivedVal = (sessionStorage.getItem('loggedInUser'));
    let rollNo = '';
    if(retreivedVal) {
      rollNo = JSON.parse(retreivedVal);
    }
    console.log(`${this._url}/getAvailability/${rollNo}`);
   return this.http.get<eventResponseServer>(`${this._url}/getAvailability/${rollNo}`)
  }
}
