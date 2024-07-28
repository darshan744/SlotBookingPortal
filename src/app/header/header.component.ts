import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import {MatToolbar} from '@angular/material/toolbar'
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbar,
    MatIcon
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  userdetails:any
  ngOnInit(){
    const details = sessionStorage.getItem('loggedInUser')
    if(details){
      this.userdetails = JSON.parse(details);
    }
  }
}
