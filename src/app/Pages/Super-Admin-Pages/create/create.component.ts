import { CommonModule } from '@angular/common';
import {ChangeDetectionStrategy, Component, inject, OnInit, signal} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ChipModule } from 'primeng/chip';
import { DateFilterFn, MatDatepickerModule } from '@angular/material/datepicker'
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete'
import {  MatChipsModule } from '@angular/material/chips';
import { provideNativeDateAdapter } from '@angular/material/core';
import { SuperAdminService } from '../../../Services/SuperAdminServices/SlotGenerate/super-admin.service';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { staffs } from '../../../Models/slot-breaks';
import {IStaff, IStaffAndEvents} from "../../Super-Admin-Pages/SuperAdmin.interface";
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { Divider } from 'primeng/divider';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { assignSlotsToDate, assignToStaff, generateHoursForStaffs, i } from '../../../helpers';
@Component({
  selector: 'app-create',
  imports: [
    ButtonModule,
    SelectModule,
    DatePickerModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatDatepickerModule,
    MatTabsModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatCardModule,
    ChipModule,
    Divider,
    CardModule,
    DialogModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateComponent implements OnInit {
  display: boolean = false;
  years: string[] = ['Year 1', 'Year 2', 'Year 3', 'Year 4'];
  /**Services */
  Service = inject(SuperAdminService);

  /**Properties */
  enteredStaff = signal('');
  displaySelectedStaff = signal<staffs['data']>([]);
  slots = signal<string[]>([]);
  startDate: string = '';
  endDate: string = '';
  responseDeadline: Date | null = null;
  staffs: IStaff[] = [] as any;
  events: string[] = [];
  forYear: string = '';
  eventTypeRequest: string = '';

  /**Methods*/

  addStaffToChip(e: string) {
    let value = e;
    this.enteredStaff.set('');
    this.displaySelectedStaff.update(
      (staffs: { id: string; name: string }[]) => {
        let addStaff = this.staffs.find((staff) => staff.id === value);
        if (
          addStaff &&
          !this.displaySelectedStaff().some((staff) => staff.id === value)
        ) {
          return [...staffs, addStaff];
        } else {
          return [...staffs];
        }
      }
    );
  }

  dateFilter: DateFilterFn<Date | null> = (date: Date | null): boolean => {
    if (!date) return false;
    let day = (date || new Date()).getDay();
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    return day !== 0 && date >= today;
  };

  ngOnInit(): void {
    this.Service.getStaffAndEvents().subscribe((e: IStaffAndEvents) => {
      this.staffs = e.staffs;
      this.events = e.events;
    });
  }

  removeStaff(inputStaff: string) {
    this.displaySelectedStaff.update((staff) =>
      staff.filter((staff) => staff.name !== inputStaff)
    );
  }

  //Open Dialog
  submit() {
    if (
      this.responseDeadline &&
      this.displaySelectedStaff().length !== 0 &&
      this.startDate !== '' &&
      this.endDate !== ''
    ) {
      if (new Date(this.startDate) > this.responseDeadline) {
        let staffs = this.displaySelectedStaff(),
          forYear = this.forYear,
          eventTypeRequest = this.eventTypeRequest;

        this.responseDeadline.setHours(23);
        this.responseDeadline.setMinutes(59);
        this.responseDeadline.setSeconds(59);
        // this.Service.openDialog(
        //   staffs,
        //   this.startDate,
        //   this.endDate,
        //   this.responseDeadline,
        //   forYear,
        //   eventTypeRequest
        // );
        this.createModalData(
          staffs,
          this.startDate,
          this.endDate,
          this.responseDeadline,
          forYear,
          eventTypeRequest
        );
        this.display = true;
      } else {
        alert('Starting Date must be greater than Deadline');
      }
    } else {
      alert('Enter Data');
    }
  }
  createModalData(
    staffs: IStaff[],
    startDate: string,
    endDate: string,
    responseDeadline: Date,
    forYear: string,
    eventTypeRequest: string
  ) {
    const groupedDates = assignSlotsToDate(
      startDate,
      endDate,
      generateHoursForStaffs()
    );
    this.dialogData = assignToStaff(
      staffs,
      groupedDates,
      responseDeadline,
      forYear,
      eventTypeRequest
    );
  }
  dialogData: i[] = [];
  removeTiming() {
    
  }
}

