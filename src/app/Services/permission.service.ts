import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(private http : HttpClient) { }
  private url :string = "http://localhost:3000/api/v1/verify";


  private getTok () {
    return this.http.get(this.url);
  }
  isAllowed() {
    const user : any = this.getTok();

  }
}
