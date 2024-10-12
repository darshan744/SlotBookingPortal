import { Component,inject } from '@angular/core';
import {CommonModule} from '@angular/common'
import { MatDialogModule ,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import {data} from '../../Models/slot-breaks'
import { MatDivider } from '@angular/material/divider';
@Component({
  selector: 'app-status-dialog',
  standalone: true,
  imports: [CommonModule,MatButton,MatDivider,MatDialogModule],
  templateUrl: './status-dialog.component.html',
  styleUrl: './status-dialog.component.css'
})
export class StatusDialogComponent {
  slots : string[] = ["09:00-09:15", "09:15-09:30", "09:30-09:45", "09:45-10:00", 
    "10:00-10:15", "10:15-10:30", "10:45-11:00", "11:00-11:15", "11:15-11:30", 
    "11:30-11:45","11:45-12:00", "13:30-13:45", "13:45-14:00", "14:00-14:15", "14:15-14:30", 
    "14:30-14:45", "14:45-15:00", "15:00-15:15", "15:30-15:45", "15:45-16:00", 
     "16:00-16:15","16:15-16:30"] ;
  data:data = inject(MAT_DIALOG_DATA);
  
}
