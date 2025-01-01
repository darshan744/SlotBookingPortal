import {  Component, inject,  OnInit ,ViewChild , TemplateRef} from '@angular/core';
import { UserService } from '../../Services/StudentService/user.service';
import { DialogOpenService } from '../../Services/DialogOpenService/dialog.service';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { CommonModule , DatePipe} from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Router, ActivatedRoute } from '@angular/router';
import {IBookingStatus, ISlot, TimeSlot} from '../Student.interface'
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDivider} from '@angular/material/divider'
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
export enum ResponseMessage {
  success = 'Slot Retrieved Successfully',
  noSlots = 'No slots found',
  AlreadyBooked = 'Already Booked',
}
@Component({
  selector: 'app-event-booking',
  standalone: true,
  imports: [MatSelectModule, DatePipe, FormsModule, CommonModule, MatButtonModule, MatFormFieldModule,
    MatDivider, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle],
  templateUrl: './event-booking.component.html',
  styleUrls: ['./event-booking.component.css' , ]
})
export class EventBookingComponent implements OnInit  {

  @ViewChild('dialogTemplate') dialogTemplate !: TemplateRef<any>;
  dialogService = inject(DialogOpenService);

  eventType : string = '';
  data : ISlot | null = null;
  alreadyBooked : IBookingStatus | null = null;
  selectedVenueStaffArray : ISlot['slots'][0]['staffs'] | null = null;
  selectedSlotsArray : ISlot['slots'][0]['staffs'][0]['slots'] | null = null;
  selectedTiming : TimeSlot[] | null = null;

  selectedVenue : string | null = null;
  selectedStaff : string | null = null;
  currentDate : string | null = null;
  currentTime : string | null = null

  constructor(private _Service: UserService , private router : Router ,
     private activatedRoute : ActivatedRoute) {}
  route = '';

  /**
   *  METHODS
   */

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params)=>{
      this.clearAll();
      this.eventType = params.get('eventType') || 'mi'
      this.route = this.router.url.split('/')[3]
      this.fetchSlots()
    })
  }

  fetchSlots() {
    this._Service.getSlots(this.eventType).subscribe({
      next:(res) => {
        this.dialogService.openSnackBar(res.message);
        console.log(res);
        const data = res.data;
        if(data && 'slotId' in data && 'startDate' in data && 'endDate' in data ){
            this.data = data;
        }
        else if(data && 'studentId' in data && 'isBooked' in data && 'bookingDate' in data) {
          this.alreadyBooked = data;
        }
      }
  });
  }

  mapStaffsToSelectedVenue() {
    console.log(this.selectedVenue);
    const venue = this.data?.slots.filter(
      slot => slot.venue === this.selectedVenue
    )
    // console.log(venue);
    if(venue) {
      this.selectedVenueStaffArray = venue[0].staffs;
    }
    // console.log(this.selectedVenueStaffArray());
  }

  mapSlotsToSelectedStaff() {
    const slots = this.selectedVenueStaffArray?.filter(
      staff => staff.id === this.selectedStaff
    )
    if(slots) {
      this.selectedSlotsArray = slots[0].slots;
    }
    console.log(this.selectedSlotsArray);
  }

  mapTimingsToSelectedDate(date : Date) {
    this.currentDate = date.toString();
    if(this.selectedSlotsArray) {
      const slotTimings = this.selectedSlotsArray.filter(
        e => new Date(e.date).toString()  ===  new Date(date).toString()
      )
    this.selectedTiming = slotTimings[0].timings;
    }
    // console.log(this.selectedTiming);
  }

  openDialog () {
    this.dialogService.openDialogWithTemplate(this.dialogTemplate,
      {date : this.currentDate , time : this.currentTime , staff:this.selectedStaff , venue : this.selectedVenue})
  }
  submit() {
    if(this.currentDate !== null && this.currentTime !== null && this.data !== null &&
    this.selectedStaff !== null && this.selectedVenue !== null && this.eventType !== '') {
      const data = {date : this.currentDate , time : this.currentTime ,slotId : this.data.slotId,
      staff : this.selectedStaff , venue : this.selectedVenue , eventType : this.eventType};
    this._Service.bookSlot(data).subscribe({
      next : (res: any) => {
        console.log(res);
        this.dialogService.openSnackBar(res.message);
      }
    });
    }
  }

  clearAll () {
    this.eventType = ''
    this.data = null;
    this.selectedVenueStaffArray = null;
    this.selectedSlotsArray = null;
    this.selectedTiming  = null;
    this.selectedVenue  = null;
    this.selectedStaff  = null;
    this.currentDate = null;
    this.currentTime = null;
    this.alreadyBooked = null;
  }
}
