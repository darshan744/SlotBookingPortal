import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../SuperAdmin/confirm-dialog/confirm-dialog.component';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { data, staffs } from '../../../Models/slot-breaks';
import { Observable } from 'rxjs';
import { AcceptedResponse, AllResponse, IEventInfo, slotData, Staff } from '../../../Models/SuperAdmin.model';
@Injectable({
  providedIn: 'root'
})
export class SuperAdminService {

  private allStaffURL = environment.ALLSTAFFURL;
  private requestAvailability = `${environment.AVAILABILITY_REQUEST_}`
  private _getAllRespnose = environment.GETALLREQUEST;
  constructor(private http: HttpClient) { }
  readonly popover = inject(MatDialog);

  private timeToMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  private minutesToTime(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const min = Math.floor(minutes % 60);
    return `${hours.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`
  }

  generate(data: { morningBreak: string; eveningBreak: string; lunchStart: string; lunchEnd: string; range: number }) {
    console.log(`SERVICE OBJ : ,${data.morningBreak},${data.eveningBreak},${data.lunchStart},${data.lunchEnd} , ${data.range}`)
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

  getAllStaff() {
    return this.http.get<staffs>(this.allStaffURL,{withCredentials:true})
  }

  getAcceptedResponse() :Observable<AcceptedResponse>  {
    return this.http.get<AcceptedResponse>(environment.ACCEPTEDRESPONSE,{withCredentials:true});
  }
  requestSlotAvailability(data: slotData) {
    this.http.post(this.requestAvailability, data,{withCredentials:true}).subscribe(res => {
      console.log(res);
    });
  }
  getAllResponse() {
    return this.http.get<{ message: string, result: AllResponse[] }>(this._getAllRespnose,{withCredentials:true})
  }
  openDialog(staffs: staffs["data"], slots: string[],
    startDate: string, endDate: string , responseDeadline : Date
  ) {
    this.popover.open(ConfirmDialogComponent, {
      data: {
        staffs: staffs, /*Arrays*/
        startDate: startDate, endDate: endDate , responseDeadline
      }
    })
  }
  getIndividualResponse(staff: data) {
    // let id = (sessionStorage.getItem('loggedInUser'))
    let id = staff.staffId;
    return this.http.get<{ message: string, Result: Staff }>(`${environment.INDIVIDUALRESPONSE}/${id}`,{withCredentials:true})
  }
  postSlot(data : any) : void {
    this.http.post(environment.SLOT , data , {withCredentials:true}).subscribe(e=>console.log(e));
  }

  createEvents(data :IEventInfo):Observable<{message : string , success:boolean}>{
    return this.http.post<{message : string , success:boolean}>(environment.CREATEEVENT , data , {withCredentials : true});
  }
  getEvents() : Observable<{message : string , data ?: {Name:string}[]} > {
   return this.http.get<{message : string , data ?: {Name:string}[]} >(environment.EVENTURL)
  }

}
