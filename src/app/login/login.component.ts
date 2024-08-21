import { Component } from '@angular/core';
import {} from '@angular/material'
import { MatFabButton } from '@angular/material/button';
import { MatCard, MatCardActions, MatCardContent } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { LoginService } from '../login.service';
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
