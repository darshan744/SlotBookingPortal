
import { Component , Inject, TemplateRef, ViewChild  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BaseChartDirective } from 'ng2-charts';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatCardModule,MatFormFieldModule,MatInputModule,
    MatExpansionModule,FormsModule,MatButtonModule,MatIconModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class Dashboard {
  @ViewChild('settings') settings !: TemplateRef<any>
  @ViewChild('event') event !:TemplateRef<any>
  currentPassword: string = '';
  newPassword: string = '';
  confirmNewPassword: string = '';
  eventName: string = '';
  eventDescription: string = '';
  slotDuration: number | null = null;
  maxParticipants: number | null = null;


  constructor(private dialog : MatDialog) {}
  // Method to handle password change
  changePassword() {
    if (this.newPassword !== this.confirmNewPassword) {
      alert('Passwords do not match!');
      return;
    }
    // Call backend API for password update
    console.log('Updating password:', this.newPassword);
  }

  openEvent() {
    this.dialog.open(this.settings)
  }

  // Method to handle new event creation
  createEvent() {
    if (!this.eventName || !this.slotDuration || !this.maxParticipants) {
      alert('Please fill in all fields!');
      return;
    }
    const event = {
      name: this.eventName,
      description: this.eventDescription,
      slotDuration: this.slotDuration,
      maxParticipants: this.maxParticipants,
    };
    // Call backend API to create event
    console.log('Creating event:', event);
  }
}
