import { Component , inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatDivider } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [MatDialogModule,MatDivider,MatChipsModule,MatButtonModule,DatePipe],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.css'
})
export class ConfirmDialogComponent{
  constructor(){}
  data = inject(MAT_DIALOG_DATA);
  
  submit() : void {
    
  }
}
