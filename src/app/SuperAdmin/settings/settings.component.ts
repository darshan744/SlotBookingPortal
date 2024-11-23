import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatChipListbox, MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [MatIconModule,MatFormFieldModule,MatInputModule,MatDivider,
    MatButtonModule,CommonModule,MatChipsModule
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  displayPassword = false;
  displayNewPassword = false;
  currentPassword = 'Darshan'
  currentEmail = 'darshank.ec22@bitsathy.ac.in'
  userName = 'Darshan';
  items = ['Mock Interview' , 'Self Introduction', 'Group Discussion']
}
