import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { MatCard, MatCardContent, MatCardImage } from '@angular/material/card';
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    HeaderComponent,
    MatCard,
    MatCardContent,
    MatCardImage
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

}
