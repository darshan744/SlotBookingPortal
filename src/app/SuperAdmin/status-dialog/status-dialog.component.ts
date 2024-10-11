import { Component } from '@angular/core';
import {CommonModule} from '@angular/common'
@Component({
  selector: 'app-status-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './status-dialog.component.html',
  styleUrl: './status-dialog.component.css'
})
export class StatusDialogComponent {
  slots : string[] = [];
}
