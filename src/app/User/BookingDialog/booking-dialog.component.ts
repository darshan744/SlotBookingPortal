import { Component, inject  } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule,  } from '@angular/material/dialog';
import { MatDivider } from '@angular/material/divider';
@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [MatDialogModule,MatButton,MatDivider],
  templateUrl: './booking-dialog.component.html',
  styleUrl: './booking-dialog.component.css'
})
export class BookingDialogComponent {
  constructor(){}
  data = inject(MAT_DIALOG_DATA);

}
