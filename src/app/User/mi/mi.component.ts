import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-mi',
  standalone: true,
  imports: [CommonModule,MatButtonModule],
  templateUrl: './mi.component.html',
  styleUrl: './mi.component.css'
})
export class MiComponent {
  dates = ['Aug 11', 'Aug 12', 'Aug 13', 'Aug 14', 'Aug 15', 'Aug 16'];
  selectedDate: string | null = null;
  availableTimings: string[] = [];

  timingsData:{[key:string]:string[]} = {
    'Aug 11': ['10:00 AM - 11:00 AM', '11:00 AM - 12:00 PM', '2:00 PM - 3:00 PM', '4:00 PM - 5:00 PM'],
    'Aug 12': ['9:00 AM - 10:00 AM', '12:00 PM - 1:00 PM', '3:00 PM - 4:00 PM'],
    'Aug 13': ['9:00 AM - 10:00 AM', '12:00 PM - 1:00 PM', '3:00 PM - 4:00 PM'],
    'Aug 14': ['9:00 AM - 10:00 AM', '12:00 PM - 1:00 PM', '3:00 PM - 4:00 PM'],
    'Aug 15': ['9:00 AM - 10:00 AM', '12:00 PM - 1:00 PM', '3:00 PM - 4:00 PM'],
    'Aug 16': ['9:00 AM - 10:00 AM', '12:00 PM - 1:00 PM', '3:00 PM - 4:00 PM'],
    // Add more timings for other dates...
  };

  selectDate(date: string) {
    this.selectedDate = date;
    this.availableTimings = this.timingsData[date] ;
  }

  bookTime(time: string) {
    alert(`You have booked the slot: ${time}`);
    // Handle the booking logic here...
  }
}
