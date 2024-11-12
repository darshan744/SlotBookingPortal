import { CommonModule } from '@angular/common';
import {
  AfterViewChecked,
  Component,
  Inject,
  inject,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';

import { MatTabsModule } from '@angular/material/tabs';
import { DialogOpenService } from '../../../Services/DialogOpenService/dialog.service';
import { SlotDataSevice } from '../../../Services/SlotDataService/SlotData.service';
import { UserService } from '../../../Services/StudentService/user.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { IComponent } from '../SharedComponent.interface';
import { Slot } from '../../../Models/Slots.model';
import { ResponseMessage } from '../mi/mi.component';
import { MatIcon } from '@angular/material/icon';
@Component({
  selector: 'app-si',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    MatPaginatorModule,
    MatTableModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
  ],
  templateUrl: '.././eventpage.html',
  styleUrl: '.././expansion.css',
})
export class SiComponent implements OnInit, AfterViewChecked, IComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dates: string[] = [];
  displayedColumns: string[] = ['Time', 'Slots', 'Action'];
  dataSource!: MatTableDataSource<Slot['slots'][0]['slots']>;
  dialogService!: DialogOpenService;
  slotDataService = inject(SlotDataSevice);

  startDate: string = '';
  endDate: string = '';
  slots: Slot['slots'] = [];
  selectedVenue: string = '';
  noSlots = signal<boolean>(false);
  eventType: string = 'Si';
  alreadyBooked = signal<boolean>(false);
  bookedDate = {
    date : '',
    time : ''
  }
  constructor(
    @Inject(DialogOpenService) dialogService: DialogOpenService,
    private _Service: UserService
  ) {
    this.dialogService = dialogService;
  }
  data: Slot = [] as any;
  ngOnInit(): void {
    this._Service
      .getSlots(this.eventType)
      .subscribe((res: { success: boolean; message: string; data : Slot | {bookingTime : string , bookingDate : string}  }) => {
        if (res.success === true && res.message === ResponseMessage.success
           && 'startDate' in res.data && 'endDate' in res.data && 'slots' in res.data) {
          this.data = res.data;
          this.slots = res.data.slots;
          this.selectedVenue = res.data.slots[0].venue;
          this.dataSource = new MatTableDataSource<any>(res.data.slots[0].slots);
          this.dates = this.getDatesBetween(this.data.startDate, this.data.endDate);
        }
        else if(res.success && res.message === ResponseMessage.AlreadyBooked) {
          this.bookedDate = {
            date : 'bookingDate' in res.data ? res.data.bookingDate : '',
            time : 'bookingTime' in res.data ? res.data.bookingTime : ''
          }

          this.alreadyBooked.set(true);
        }
        else {
          this.noSlots.set(true);
        }
      });
  }

  ngAfterViewChecked(): void {
    if (this.paginator && this.dataSource.paginator !== this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }
  display: boolean = false;
  slotTimings: { time: string; limit: number }[] = [];

  getSlots(): void {
    if (this.selectedVenue === '') return alert('Please select a venue');
    console.log(this.selectedVenue, this.display);
    const slots = this.data.slots.filter(
      (slot) => slot.venue === this.selectedVenue
    )[0].slots;
    if (slots.length === 0) {
      return alert('No slot available');
    } else {
      this.dataSource = new MatTableDataSource<any>(slots);

      this.dataSource.paginator = this.paginator;
      this.slotTimings = slots;
      this.display = true;
      console.log(this.slotTimings);
    }
  }
  getDatesBetween(startDate: string, endDate: string): string[] {
    const dates: string[] = [];
    if (startDate === undefined || endDate === undefined) {
      return [];
    }
    let currentDate = new Date(startDate);
    const end = new Date(endDate);

    const options: Intl.DateTimeFormatOptions = {
      month: 'short',
      day: 'numeric',
    };

    while (currentDate <= end) {
      dates.push(currentDate.toLocaleDateString('en-US', options));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  }
  bookSlot(date: string, time: string) {
    this.dialogService.openBookingSlotDialog(date, time,this.eventType,this.selectedVenue , this.data.slotId);
  }
}

