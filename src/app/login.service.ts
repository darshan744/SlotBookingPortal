import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

   decodeJWTToken(token:string){
    return JSON.parse(atob(token.split(".")[1]))
  }

   handleOauthResponse(response:any){
    const cred = this.decodeJWTToken(response.credential);
    sessionStorage.setItem('loggedInUser',JSON.stringify(cred));
    if(cred.email.endsWith('@bitsathy.ac.in')){
      window.location.href = '/user';
    }
    else {
      alert("Lavade gabal yara nee");
    }
  }

}
