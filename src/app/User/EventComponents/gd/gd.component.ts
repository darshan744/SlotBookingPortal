import { CommonModule } from '@angular/common';
import {
  AfterViewChecked,
  Component,
  inject,
  Inject,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { DialogOpenService } from '../../../Services/DialogOpenService/dialog.service';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatIcon } from '@angular/material/icon';
import { SlotDataSevice } from '../../../Services/SlotDataService/SlotData.service';
import { UserService } from '../../../Services/StudentService/user.service';
import { Slot } from '../../../Models/Slots.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { IComponent } from '../SharedComponent.interface';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-gd',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    MatPaginatorModule,
    MatTableModule,MatSelectModule,MatFormFieldModule,FormsModule
  ],
  templateUrl: '.././eventpage.html',
  styleUrls: ['../expansion.css'],
})
export class GDComponent implements OnInit, AfterViewChecked, IComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dates: string[] = [];
  displayedColumns: string[] = ['Time', 'Slots', 'Action'];
  dataSource!: MatTableDataSource<Slot['slots'][0]['slots']>;
  dialogService!: DialogOpenService;
  slotDataService = inject(SlotDataSevice);
  noSlots = signal<boolean>(false);
  startDate: string = '';
  endDate: string = '';
  slots: Slot['slots'] = [];
  selectedVenue: string = '';
  constructor(
    @Inject(DialogOpenService) dialogService: DialogOpenService,
    private _Service: UserService
  ) {
    this.dialogService = dialogService;
  }
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
        this.noSlots.set(true);
      }
    });
  }
  ngAfterViewChecked(): void {}
  eventType = 'GroupDiscussoin';
  timingsData = this.slotDataService.timingsGroup[this.eventType];
  display: boolean = false;
  slotTimings: { time: string; limit: number }[] = [];

  getSlots(): void {
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
  getDatesBetween(startDate: string, endDate: string): string[] {
    const dates: string[] = [];
    if(startDate === undefined || endDate === undefined) {
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
  bookSlot(date : string , time : string) {
    this.dialogService.openBookingSlotDialog(date , time)
  }
}
