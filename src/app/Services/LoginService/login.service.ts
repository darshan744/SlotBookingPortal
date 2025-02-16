import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogOpenService } from '../DialogOpenService/dialog.service';
import { ToastrService } from '../Toastr/toastr.service';
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
  toastr:ToastrService = inject(ToastrService);
  snackBar: MatSnackBar = inject(MatSnackBar);
  router = inject(Router);
  user: any = null;
  constructor(private http: HttpClient) { }
  private decodeJWTToken(token: string) {
    return JSON.parse(atob(token.split(".")[1]))
  }

  message(message: string , isError : boolean) {
    this.toastr.showToast(message , isError);
    //  const classMessage = type !== undefined ? type === "success" ? "success-snackbar":"error-snackbar" :'custom-snackbar'
  //   this.snackBar.open(message, '❌', {
  //     duration: 150000,
  //     verticalPosition: 'top',
  //     horizontalPosition: 'right',
  //     panelClass: [classMessage]
  //   })
  }

  authenticate(name: string, password: string) {
    this.http.post<LoginResponse>(environment.PASSWORD_LOGIN, { user: { name, password } },
      { withCredentials: true }
    ).subscribe((response: LoginResponse) => {
      if (!response.success) {
        this.message(response.message , true);
      }
      else if (response.success && response.role === 'Staff') {
        sessionStorage.setItem('loggedInUser', JSON.stringify(response.data));
        this.message('Login Successful' , false)
        this.router.navigate(['/admin/', 'Home']);
      }
      else if (response.success && response.role === 'Student') {
        this.message("Login Succssful" , false)
        sessionStorage.setItem('loggedInUser', JSON.stringify(response.data));
        this.router.navigateByUrl('/user/dashboard');
      }
      else if(response.success && response.role === 'SuperAdmin') {
        this.message('Login Successfull' , false);
        sessionStorage.setItem('loggedInUser' , JSON.stringify(response.data))
        this.router.navigateByUrl('/superAdmin/Search')
      }
      else {
        this.message('Invalid Credentials' , true);
      }
    })
  }
  handleOauthResponse(response: any) {
    this.user = this.decodeJWTToken(response.credential);
    this.http.post<LoginResponse>(environment.LOGIN_URL, { user: this.user }, {
      withCredentials: true
    }).subscribe((res: LoginResponse) => {
      if (!res.success) {
        this.message('Login With BitSathy MailID' , false)
      }
      else {
        sessionStorage.setItem('loggedInUser', JSON.stringify(res.data));
        if (res.role === 'staff') {
          this.router.navigateByUrl('admin/Home')
        }
        else {
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
