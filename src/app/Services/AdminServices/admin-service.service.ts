import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { event,eventResponseServer} from '../../Models/slot-breaks'
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  router = inject(ActivatedRoute)
  private _url = environment.ADMIN_URL;
  constructor(private  http : HttpClient, private _snackBar : MatSnackBar) { 
    
  }
  
  getAvailabilityRequest(): Observable<eventResponseServer> {
    const retreivedVal = (sessionStorage.getItem('loggedInUser'));
    let rollNo = '';
    if(retreivedVal) {
      rollNo = JSON.parse(retreivedVal);
    }
    console.log(`${this._url}/getAvailability/${rollNo}`);
   return  this.http.get<eventResponseServer>(`${this._url}/getAvailability/${rollNo}`)
  }
  html = ``;
  postAvailabilityResponse( e : event[]) {
    const ret = (sessionStorage.getItem('loggedInUser'));
    let rollNo = '';
    
    if(ret) {
      rollNo = JSON.parse(ret);
      this.http.post(`${this._url}/postAvailability/${rollNo}`,e).subscribe((res : any) => {
        let msg:string = res.message === 'Success'? ' ✅Done':' ❌Could Not Update'; 
        this._snackBar.open(msg,"✖️" /*Actions */ ,{
          duration:2000,
          verticalPosition:'top',
          horizontalPosition:'right',
          panelClass:'custom-snackbar'
        })
        console.log(res); 
      })
    }
  }
}
