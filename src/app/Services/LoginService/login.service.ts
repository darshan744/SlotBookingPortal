import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { MatSnackBar } from '@angular/material/snack-bar';
interface LoginResponse {
  success: boolean,
  role?: string,
  message: string,
  data?: {
    id: string, name: string,
    email: string,department:string,resume:string
  }
}
@Injectable({
  providedIn: 'root'
})


export class LoginService {

  snackBar: MatSnackBar = inject(MatSnackBar);
  router = inject(Router);
  user: any = null;
  private _url = environment.LOGIN_URL;
  constructor(private http: HttpClient) { }
  private decodeJWTToken(token: string) {
    return JSON.parse(atob(token.split(".")[1]))
  }

  message(message: string) {
    this.snackBar.open(message, '❌', {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: ['custom-snackbar']
    })
  }

  authenticate(name: string, password: string) {
    this.http.post<LoginResponse>(environment.PASSWORD_LOGIN, { user: { name, password } },
      { withCredentials: true }
    ).subscribe((response: LoginResponse) => {
      console.log(response);
      if (response.success === false) {
        this.message(response.message);
      }
      else if (response.success === true && response.role === 'Staff') {
        sessionStorage.setItem('loggedInUser', JSON.stringify(response.data));
        this.message('Login Successful')
        this.router.navigate(['/admin/', 'Home']);
      }
      else if (response.success === true && response.role === 'Student') {
        this.message("Login Succssful")
        sessionStorage.setItem('loggedInUser', JSON.stringify(response.data));
        this.router.navigateByUrl('/user/dashboard');
      }
      else {
        this.message('Invalid Credentials');
      }
    })
  }
  handleOauthResponse(response: any) {
    this.user = this.decodeJWTToken(response.credential);
    this.http.post<LoginResponse>(environment.LOGIN_URL, { user: this.user }, {
      withCredentials: true
    }).subscribe((res: LoginResponse) => {
      if (res.success === false) {
        this.message('Login With BitSathy MailID')
      }
      else {
        sessionStorage.setItem('loggedInUser', JSON.stringify(res.data));
        if (res.role === 'staff') {
          console.log('staff');
          this.router.navigateByUrl('admin/Home')
        }
        else {
          console.log('student');
          this.router.navigateByUrl('user/dashboard');
        }
      }
    });
  }
  handleSignOut() {
    sessionStorage.removeItem('loggedInUser');
    this.http.post(`${environment.LOGOUT}`, {}, {
      withCredentials: true
    }).subscribe((res) => {
      this.router.navigate(['/']).then(() => {
        window.location.reload();
      })
    })
  }


}
