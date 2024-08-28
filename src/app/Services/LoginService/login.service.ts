import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

   user:any=null;

  constructor() { }

   decodeJWTToken(token:string){
    return JSON.parse(atob(token.split(".")[1]))
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
