import {  Injectable,inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../SuperAdmin/confirm-dialog/confirm-dialog.component';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { staffs } from '../../../Models/slot-breaks';
type slotData = {
  staffs : staffs["staffs"] , slots : string[],
    startDate : string , endDate : string
}
@Injectable({
  providedIn: 'root'
})
export class SlotGenerateService {

  private allStaffURL = `${environment.BASE_SUPERADMIN_URL}/getAllStaff`;
  private requestAvailability = `${environment.AVAILABILITY_REQUEST_}`
  constructor(private http : HttpClient) { }
  readonly popover = inject(MatDialog);

  getAllStaff() {
     return this.http.get<staffs>(this.allStaffURL)
  }
  requestSlotAvailability(data : slotData) {
    console.log("service function")
    this.http.post(this.requestAvailability, data).subscribe(res=>{
      console.log(res);
    });
  }

  private timeToMinutes(time : string):number {
    const [hours , minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }
  
  private minutesToTime ( minutes : number) : string {
    const hours = Math.floor(minutes / 60);
    const min = Math.floor(minutes % 60);
    return `${hours.toString().padStart(2,'0')}:${min.toString().padStart(2,'0')}`
  } 
  generate(data: { morningBreak: string; eveningBreak: string; lunchStart: string; lunchEnd: string; range: number }) {
    console.log(`SERVICE OBJ : ,${data.morningBreak},${data.eveningBreak},${data.lunchStart},${ data.lunchEnd} , ${data.range}`)
    let startTime = '9:00';
    const endTime = '16:15';
    const slots: string[] = [];
    const breakRange: number = 15;
    let startMinutes = this.timeToMinutes(startTime);
    let endMinutes = this.timeToMinutes(endTime);
    let morningBreakMinutes = this.timeToMinutes(data.morningBreak);
    let eveningBreakMinutes = this.timeToMinutes(data.eveningBreak);
    let lunchStartMinutes = this.timeToMinutes(data.lunchStart);
    let lunchEndMinutes = this.timeToMinutes(data.lunchEnd);
    let i = 0;
    while (startMinutes <= endMinutes) {
      let newTime = this.minutesToTime(startMinutes);
      let newEndTime = this.minutesToTime(startMinutes + data.range);

      const overlapsWithBreak =
        (startMinutes >= morningBreakMinutes && startMinutes < morningBreakMinutes + breakRange) ||
        (startMinutes >= eveningBreakMinutes && startMinutes < eveningBreakMinutes + breakRange) ||
        (startMinutes + data.range > lunchStartMinutes && startMinutes < lunchEndMinutes);

      if (overlapsWithBreak) {
        startMinutes += data.range;
        console.log(i++);
        continue;
      }

      let finalTime = newTime + " - " + newEndTime;
      slots.push(finalTime);      
      startMinutes += data.range;
    }
    
    return slots;
  }
  openDialog(staffs : staffs["staffs"] , slots : string[],
    startDate : string , endDate : string
  ) {
    this.popover.open(ConfirmDialogComponent , {
      data : { staffs : staffs , slots : slots , /*Arrays*/
         startDate : startDate , endDate : endDate }
    })
  }
  
}
