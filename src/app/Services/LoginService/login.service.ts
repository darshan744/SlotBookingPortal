import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as studentsData from '../../../Data.json'
import { student } from '../../Models/Student';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  router = inject(Router);
   user:any=null;
  url =  "http://localhost:3000/students";
  students = studentsData;
  constructor(private http : HttpClient) { }

   decodeJWTToken(token:string){
    return JSON.parse(atob(token.split(".")[1]))
  }
  
  authenticate(rollNO:string , password:string){
    this.http.get<student[]>(`${this.url}?rollNo=${rollNO}`).subscribe((std)=>{
      console.log(std[0].name +" "+  std[0].password);
      
      if(password === std[0].password) {
        console.log("if statemtn");
        return this.router.navigateByUrl("/user/dashboard");
      }
      console.log("wrong Password");
      return this.router.navigateByUrl("/NotAUser")
    });
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
