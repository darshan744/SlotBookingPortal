import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { MatCard, MatCardContent, MatCardHeader, MatCardImage } from '@angular/material/card';
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    HeaderComponent,
    MatCard,
    MatCardContent,
    MatCardImage,
    MatCardHeader
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

}
