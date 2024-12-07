import { Component, inject, OnInit, SimpleChanges } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
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
  constructor(private _slotrequest: SuperAdminService) {}
  data: slotData = inject(MAT_DIALOG_DATA);

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class
    console.log(changes);
  }

  requestingData: i[] = [];
  ngOnInit(): void {
    console.log(null === undefined);
    const groupedDates = assignSlotsToDate(
      this.data.startDate,
      this.data.endDate,
      generateHoursForStaffs()
    );
    this.requestingData = assignToStaff(
      this.data.staffs,
      groupedDates,
      this.data.responseDeadline
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
    console.log(this.requestingData);
  }
  getter (id:string) {
    return this.data.staffs.find(e=>e.id === id)
  }
  submit(): void {
    console.log(this.data);
   const sub$ = this._slotrequest.requestSlotAvailability(this.requestingData);
  }
}
