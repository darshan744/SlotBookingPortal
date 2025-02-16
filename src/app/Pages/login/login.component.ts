import { Component, signal } from '@angular/core';
import { MatButtonModule} from '@angular/material/button';
import {  MatFormFieldModule, MatLabel, } from '@angular/material/form-field';
import {  MatInputModule } from '@angular/material/input';
import { LoginService } from '../../Services/LoginService/login.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup , FormControl ,Validators} from '@angular/forms';
import { environment } from '../../../environments/environment.development';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-login',
    imports: [
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatLabel,
        MatButtonModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(
    private service: LoginService,
  ) {}

  credentials = new FormGroup({
    userName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  
  password = signal<boolean>(true);
  private _clientId = environment.GOOGLE_CLIENTID;

  public get clientId(): string {
    return this._clientId;
  }
  submit() {
    let name = this.credentials.value.userName;
    let password = this.credentials.value.password;
    if (
      name !== '' &&
      password !== '' &&
      name !== null &&
      password !== null &&
      name !== undefined &&
      password !== undefined
    ) {
      this.service.authenticate(name, password);
    }
  }

  /**
   * The bind method binds an object to a function example here
   * in window object handleOauthResponse method is created and for this function
   * the login components handleOauthResponse function with binded to the login compoenent
   * is assigned so that the windows handleOauth has the login components properties to work with,
   * from the windows object we call the login components handleOauth function and
   * with the help of binding we are able to call the service thats injected inside the login component
   * and call the service's handleOauthFunction
   *
   * -> the reason for using above method is because the google callback is only callable with
   * -> index script so with binding to window its accessable.
   */
  ngOnInit(): void {
    (window as any).handleOauthResponse = this.handleOauthResponse.bind(this);
  }

  handleOauthResponse(response: any): void {
    this.service.handleOauthResponse(response);
  }
}
