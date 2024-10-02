import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule} from '@angular/material/tabs';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { openPopOver } from '../openDialogFn';
@Component({
  selector: 'app-mi',
  standalone: true,
  imports: [CommonModule,MatButtonModule,MatTabsModule,MatDialogModule],
  templateUrl: './mi.component.html',
  styleUrl: './mi.component.css'
})
export class MiComponent {

  readonly popOver = inject(MatDialog)

  dates = ['Aug 11', 'Aug 12', 'Aug 13', 'Aug 14', 'Aug 15', 'Aug 16'];
  selectedDate: string | null = null;
  availableTimings: string[] = [];

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

  openDialog(timing:string,date:string) {
    console.log(timing);
    
    this.popOver.open(DialogComponent,{
      width:'320px',height:'250px',
      data:{timing : timing,date:date}
    });
  }
  
}
