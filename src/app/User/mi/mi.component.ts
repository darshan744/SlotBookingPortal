import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {  MatTabChangeEvent, MatTabsModule} from '@angular/material/tabs';
import { MatDialogModule} from '@angular/material/dialog';
import { DialogOpenService } from '../../Services/DialogOpenService/dialog.service';
@Component({
  selector: 'app-mi',
  standalone: true,
  imports: [CommonModule,MatButtonModule,MatTabsModule,MatDialogModule],
  templateUrl: './mi.component.html',
  styleUrl: './mi.component.css'
})
export class MiComponent {
  onTabChange($event: MatTabChangeEvent) {
    this.selectedDate = $event.index;
    console.log(this.dates[this.selectedDate]);
  }

  dialogService = inject(DialogOpenService)

  // constructor(private dialogService : DialogOpenService){}

  dates = ['Aug 11', 'Aug 12', 'Aug 13', 'Aug 14', 'Aug 15', 'Aug 16'];
  selectedDate: number = 0;
  availableTimings: string[] = [];
  s:boolean = true;
  timingsData:{[key:string]:string[]} = {
    'Aug 11': [
      '10:00 AM - 11:00 AM',
      '11:00 AM - 12:00 PM',
      '2:00 PM - 3:00 PM',
      '4:00 PM - 5:00 PM',
      '5:00 PM - 6:00 PM'
  ],
  'Aug 12': [
      '9:00 AM - 10:00 AM',
      '12:00 PM - 1:00 PM',
      '3:00 PM - 4:00 PM',
      '1:30 PM - 2:30 PM' 
  ],
  'Aug 13': [
      '9:00 AM - 10:00 AM',
      '12:00 PM - 1:00 PM',
      '3:00 PM - 4:00 PM',
      '4:30 PM - 5:30 PM' 
  ],
  'Aug 14': [
      '9:00 AM - 10:00 AM',
      '12:00 PM - 1:00 PM',
      '3:00 PM - 4:00 PM',
      '2:00 PM - 3:00 PM' 
  ],
  'Aug 15': [
      '9:00 AM - 10:00 AM',
      '12:00 PM - 1:00 PM',
      '3:00 PM - 4:00 PM',
      '1:00 PM - 2:00 PM'
  ],
  'Aug 16': [
      '9:00 AM - 10:00 AM',
      '12:00 PM - 1:00 PM',
      '3:00 PM - 4:00 PM',
      '4:00 PM - 5:00 PM' 
  ]
};


}
