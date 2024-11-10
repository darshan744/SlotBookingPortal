import { CommonModule } from '@angular/common';
import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { DialogOpenService } from '../../../Services/DialogOpenService/dialog.service';
import { SlotDataSevice } from '../../../Services/SlotDataService/SlotData.service';
import { UserService } from '../../../Services/StudentService/user.service';

import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIcon } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { IComponent } from '../SharedComponent.interface';

interface Slot {
  startDate: string;
  endDate: string;
  slots: {
    venue: string;
    staffs: string[];
    slots: { time: string; limit: number }[];
  }[];
}

@Component({
  selector: 'app-mi',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatTabsModule,
    MatSelectModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  templateUrl: '.././eventpage.html',
  styleUrls: ['../expansion.css'],
})
export class MiComponent implements OnInit, AfterViewChecked , IComponent{

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource!: MatTableDataSource<Slot['slots'][0]['slots']>;
  dialogService = inject(DialogOpenService);
  slotDataService = inject(SlotDataSevice);
  startDate: string = '';
  endDate: string = '';
  slots: Slot['slots'] = [];
  selectedVenue: string = '';
  displayedColumns: string[] = ['Time', 'Slots', 'Action'];
  noSlots = signal<boolean>(false);
  constructor(private _Service: UserService) {}

  ngOnInit(): void {
    this._Service.getSlots().subscribe((res: { data: Slot }) => {
      if(res.data !== undefined) {
        this.startDate = res.data.startDate;
        this.endDate = res.data.endDate;
        this.slots = res.data.slots;
        this.selectedVenue = res.data.slots[0].venue;
        this.dataSource = new MatTableDataSource<any>(res.data.slots[0].slots);

        this.dates = this.getDatesBetween(this.startDate, this.endDate);
      }
      else {
        this.noSlots.set(true)
      }
    });
  }

  ngAfterViewChecked(): void {
    if (this.paginator && this.dataSource.paginator !== this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  dates: string[] = [];

  expansion(opened: string, event: boolean) {
    const exp = document.getElementById(opened);
    event === true
      ? exp?.classList.add('highlight-venue')
      : exp?.classList.remove('highlight-venue');
    console.log(exp?.classList);
  }
  isOpened = signal(false);

  getDatesBetween(startDate: string, endDate: string): string[] {
    const dates: string[] = [];
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
  slotTimings: Slot['slots'][0]['slots'] = [];
  display: boolean = false;

  getSlots() {
    if (this.selectedVenue === '') return alert('Please select a venue');
    console.log(this.selectedVenue, this.display);
    const slots = this.slots.filter(
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

  bookSlot(date : string , time : string) {
    this.dialogService.openBookingSlotDialog(date , time)
  }
}
