import { Component , inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatDivider } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { DatePipe } from '@angular/common';
import { SlotGenerateService } from '../../Services/SuperAdminServices/SlotGenerate/slot-generate.service';
import { staffs } from '../../Models/slot-breaks';
type slotData = {
  staffs : staffs["staffs"] , slots : string[],
    startDate : string , endDate : string
}
@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [MatDialogModule,MatDivider,MatChipsModule,
    MatChipsModule,MatButtonModule,DatePipe],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.css'
})
export class ConfirmDialogComponent{
  constructor(private _slotrequest : SlotGenerateService){}
  data : slotData = inject(MAT_DIALOG_DATA);
  

  submit() : void {
    console.log("submit");
    this._slotrequest.requestSlotAvailability(this.data)
  } 
}
