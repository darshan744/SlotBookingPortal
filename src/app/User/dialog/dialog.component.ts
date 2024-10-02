import { Component, inject  } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule,  } from '@angular/material/dialog';
import { MatDivider } from '@angular/material/divider';
@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [MatDialogModule,MatButton,MatDivider],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent {
  constructor(){}
  data = inject(MAT_DIALOG_DATA);
  
}
