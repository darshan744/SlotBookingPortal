import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatDivider } from '@angular/material/divider';
import { MatChipEvent, MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule, DatePipe } from '@angular/common';
import { staffs } from '../../Models/slot-breaks';
import { SuperAdminService } from '../../Services/SuperAdminServices/SlotGenerate/super-admin.service';
import {
  assignSlotsToDate,
  assignToStaff,
  generateHoursForStaffs,
  i,
} from '../../helpers';
import { MatIconModule } from '@angular/material/icon';

type slotData = {
  staffs: staffs['data'];
  startDate: string;
  endDate: string;
  responseDeadline: Date;
  forYear : string ,
  eventTypeRequest : string,
};
@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatDivider,
    MatChipsModule,
    CommonModule,
    MatIconModule,
    MatChipsModule,
    MatButtonModule,
    DatePipe,
  ],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.css',
})
export class ConfirmDialogComponent implements OnInit {
  constructor(private _slotRequest: SuperAdminService) {}
  data: slotData = inject(MAT_DIALOG_DATA);

  requestingData: i[] = [];

  ngOnInit(): void {
    const groupedDates = assignSlotsToDate(
      this.data.startDate,
      this.data.endDate,
      generateHoursForStaffs()
    );
    this.requestingData = assignToStaff(
      this.data.staffs,
      groupedDates,
      this.data.responseDeadline,
      this.data.forYear,
      this.data.eventTypeRequest
    );
    console.log(this.requestingData);
  }

  removeTime(event: MatChipEvent) {
    const value = event.chip.value;
    for (const request of this.requestingData) {
      request.availableSlots.forEach((e) => {
        e.slots = e.slots.filter((e) => !(e.time === value));
      });
    }
    console.log(this.requestingData);
  }

  removeDate(event: MatChipEvent) {
    const value = new Date(event.chip.value);
    for (const request of this.requestingData) {
      request.availableSlots = request.availableSlots.filter(
        (e) =>{
          const date = new Date(e.date)
          return !(date.getDate() === value.getDate() &&
                  date.getMonth() === value.getMonth() &&
                  date.getFullYear() === value.getFullYear())
        }
      );
    }
  }

  removeStaff(event: MatChipEvent) {
    const value :string = event.chip.value.split('-')[1].trimStart();
    this.requestingData = this.requestingData.filter(
      e=>!(e.instructorId === value)
    )
  }

  getter (id:string) {
    return this.data.staffs.find(e=>e.id === id)
  }

  submit(): void {
   this._slotRequest.requestSlotAvailability(this.requestingData);
  }
}
