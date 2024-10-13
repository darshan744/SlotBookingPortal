import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { student } from '../../Models/Student';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  router = inject(Router);
  user:any=null;
  private _url = environment.BASE_URL + '/api/v1/login';
  constructor(private http : HttpClient) { }
  private _role = '';
  private _id = '';
   decodeJWTToken(token:string){
    return JSON.parse(atob(token.split(".")[1]))
  }
  
  authenticate(rollNo:string ){
    this.http.post(this._url , {rollNo}).subscribe((response : any)=>{
      this._id = rollNo;
      this._role = response.role;
      if(response.role === 'staff') {
        return   this.router.navigateByUrl('/admin/Home');
      }
      else if(response.role === 'student') {
        return  this.router.navigateByUrl('/user/dashboard');
      }
      else {
       return this.router.navigateByUrl('/NotAUser');
      }
    })
  }

   handleOauthResponse(response:any){
     this.user = this.decodeJWTToken(response.credential);
    if(this.user){
      this.user = this.user;
    }
    sessionStorage.setItem('loggedInUser',JSON.stringify(this.user));
    if(this.user.email.endsWith('@bitsathy.ac.in')){
      window.location.href = '/user/dashboard';
    }
    else if(this.user.email==='darshankumaravelk@gmail.com'){
      window.location.href = '/superAdmin'
    }
    else if(this.user.email==='darshan07042004@gmail.com'){
      window.location.href = '/admin/Home'
    }
    else {
      alert("Sign in with Bisathy mail only");
    }
    
  }
   
}
