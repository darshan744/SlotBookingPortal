import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-gd',
  standalone: true,
  imports: [CommonModule,MatTabsModule,MatButton],
  templateUrl: './gd.component.html',
  styleUrl: './gd.component.css'
})
export class GDComponent {
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
