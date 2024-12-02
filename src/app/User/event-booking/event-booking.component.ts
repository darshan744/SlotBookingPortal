import { AfterViewChecked, Component, inject, Input, OnInit, QueryList, signal, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UserService } from '../../Services/StudentService/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { Slot } from '../../Models/Slots.model';
import { DialogOpenService } from '../../Services/DialogOpenService/dialog.service';
import { SlotDataSevice } from '../../Services/SlotDataService/SlotData.service';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Router, ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
export enum ResponseMessage {
  success = 'Slot Retrieved Successfully',
  noSlots = 'No slots found',
  AlreadyBooked = 'Already Booked',
}
@Component({
  selector: 'app-event-booking',
  standalone: true,
  imports: [MatTabsModule , MatSelectModule, FormsModule , MatTableModule , CommonModule , MatPaginator ,
     MatButtonModule ,
  ],
  templateUrl: './event-booking.component.html',
  styleUrls: ['./event-booking.component.css' , ]
})
export class EventBookingComponent implements OnInit , AfterViewChecked {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChildren(MatPaginator) paginators !: QueryList<MatPaginator>;

  dataSource!: MatTableDataSource<Slot['slots'][0]['slots']>;
  dialogService = inject(DialogOpenService);
  slotDataService = inject(SlotDataSevice);

  dates: string[] = [];
  selectedTab : number = 0;
  eventType : string = '';
  selectedVenue: string = '';
  displayedColumns: string[] = ['Time', 'Slots', 'Action'];
  noSlots = signal<boolean>(false);
  alreadyBooked = signal<boolean>(false);
  bookedDate = {
    date : '',
    time : '',
    venue:''
  }

  data : Slot = [] as any;

  arrayPaginator: MatPaginator[] = [];
  constructor(private _Service: UserService , private router : Router ,
     private activatedRoute : ActivatedRoute) {}
  route = ''

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params)=>{
      this.eventType = params.get('eventType') || 'mi'
      this.route = this.router.url.split('/')[3]
      this.fetchSlots()
    })
    // this._Service
    //   .getSlots(this.eventType)
    //   .subscribe((res: { success: boolean; message: string; data : Slot | {bookingTime : string , bookingDate : string}  }) => {

    //     if (res.success === true && res.message === ResponseMessage.success
    //        && 'startDate' in res.data && 'endDate' in res.data && 'slots' in res.data) {

    //       this.data = res.data;
    //       this.selectedVenue = res.data.slots[0].venue;
    //       this.dataSource = new MatTableDataSource<any>(res.data.slots[0].slots);
    //       this.dates = this.getDatesBetween(this.data.startDate, this.data.endDate);
    //     }
    //     else if(res.success && res.message === ResponseMessage.AlreadyBooked) {
    //       this.bookedDate = {
    //         date : 'bookingDate' in res.data ? res.data.bookingDate : '',
    //         time : 'bookingTime' in res.data ? res.data.bookingTime : ''
    //       }
    //       this.alreadyBooked.set(true);
    //     }
    //     else {
    //       this.noSlots.set(true);
    //     }
    //   });

  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    console.log('destroyed')
  }
  fetchSlots() {
    this._Service
      .getSlots(this.eventType)
      .subscribe((res: { success: boolean; message: string; data : Slot | {bookingTime : string , bookingDate : string , bookingVenue:string}  }) => {

        if (res.success === true && res.message === ResponseMessage.success
           && 'startDate' in res.data && 'endDate' in res.data && 'slots' in res.data) {

          this.data = res.data;
          this.selectedVenue = res.data.slots[0].venue;
          this.dataSource = new MatTableDataSource<any>(res.data.slots[0].slots);
          this.dates = this.getDatesBetween(this.data.startDate, this.data.endDate);
          this.noSlots.set(false);
          this.alreadyBooked.set(false);
        }
        else if(res.success && res.message === ResponseMessage.AlreadyBooked) {
          this.bookedDate = {
            date : 'bookingDate' in res.data ? res.data.bookingDate : '',
            time : 'bookingTime' in res.data ? res.data.bookingTime : '',
            venue: 'bookingVenue' in res.data ? res.data.bookingVenue: ''
          }
          this.noSlots.set(false);
          this.alreadyBooked.set(true);
        }
        else {
          this.alreadyBooked.set(false);
          this.noSlots.set(true);
        }
      });
  }
  ngAfterViewChecked(): void {
    if (this.paginators !==undefined && this.paginator !== undefined && this.dataSource.paginator !== this.paginator) {
      this.arrayPaginator = this.paginators.toArray()
      this.dataSource.paginator = this.paginator;
    }
  }

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

  getSlots() {
    if (this.selectedVenue === '') return alert('Please select a venue');

    const slots = this.data.slots.filter(
      (slot) => slot.venue === this.selectedVenue
    )[0].slots;
    if (slots.length === 0) {
      return alert('No slot available');
    } else {
      this.dataSource = new MatTableDataSource<any>(slots);
      this.dataSource.paginator = this.arrayPaginator[this.selectedTab];
    }
  }

  bookSlot(date: string, time: string) {
    this.dialogService.openBookingSlotDialog(date, time, this.eventType,this.selectedVenue , this.data.slotId);
  }

  onTabChange(event : MatTabChangeEvent) {
    const slots = this.data.slots.filter(
      (slot) => slot.venue === this.selectedVenue
    )[0].slots;
    this.selectedTab = event.index;
    this.dataSource = new MatTableDataSource<any>(slots);
    const paginator :any = this.arrayPaginator[event.index]
    this.dataSource.paginator = paginator;
  }

}
