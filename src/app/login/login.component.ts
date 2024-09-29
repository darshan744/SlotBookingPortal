import { Component } from '@angular/core';
import { MatFabButton } from '@angular/material/button';
import { MatCard, MatCardActions, MatCardContent } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { LoginService } from '../Services/LoginService/login.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCard,
    MatCardActions,
    MatCardContent,
    MatFormField,
    MatInput,
    MatLabel,
    MatFabButton,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
  export class LoginComponent {
    constructor(private service:LoginService,private router:Router){}

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
    ngOnInit():void{
      (window as any).handleOauthResponse = this.handleOauthResponse.bind(this);
    }

    login={
      Email:String,
      password:String
    };

    navigate(){
        this.router.navigate(['/user'])
    }
    handleOauthResponse(response:any):void{
      this.service.handleOauthResponse(response)
    }
  }
