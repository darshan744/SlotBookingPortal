import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  private _url = environment.BASE_URL;
  constructor(private  http : HttpClient) { }
  getAvailabilityRequest() {
    
  }
}
