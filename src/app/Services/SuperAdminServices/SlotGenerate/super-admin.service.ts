import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../SuperAdmin/confirm-dialog/confirm-dialog.component';
import { environment } from '../../../../environments/environment.development';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import { data } from '../../../Models/slot-breaks';
import { Observable } from 'rxjs';
import { AcceptedResponse, AllResponse, IEventInfo, Staff } from '../../../Models/SuperAdmin.model';
import { i } from '../../../helpers';
import { DialogOpenService } from '../../DialogOpenService/dialog.service';
import {ISlot, IStaff, IStaffAndEvents , IBreaks , IBaseResponse} from "../../../SuperAdmin/SuperAdmin.interface";


@Injectable({
  providedIn: 'root'
})
export class SuperAdminService {

  private allStaffURL = environment.ALL_STAFF_URL;
  private requestAvailability = `${environment.AVAILABILITY_REQUEST_}`
  private _getAllResponse = environment.GET_ALL_RESPONSE;
  constructor(private http: HttpClient) { }
  readonly popover = inject(MatDialog);
  snackBarService = inject(DialogOpenService)

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
    let startTime : string = '08:45';
    const endTime : string = '16:30';
    const endTimeInMinutes : number = this.timeToMinutes(endTime);
    console.log(endTimeInMinutes)
    const slots: string[] = [];
    const breakRange: number = 15;
    let startMinutes = this.timeToMinutes(startTime);
    let endMinutes = this.timeToMinutes(endTime);
    let morningBreakMinutes = this.timeToMinutes(data.morningBreak);
    let eveningBreakMinutes = this.timeToMinutes(data.eveningBreak);
    let lunchStartMinutes = this.timeToMinutes(data.lunchStart);
    let lunchEndMinutes = this.timeToMinutes(data.lunchEnd);
    while (startMinutes <= endMinutes) {
      let newTime = this.minutesToTime(startMinutes);
      let newEndTime = this.minutesToTime(startMinutes + data.range);

      const overlapsWithBreak =
        (startMinutes >= morningBreakMinutes && startMinutes < morningBreakMinutes + breakRange) ||
        (startMinutes >= eveningBreakMinutes && startMinutes < eveningBreakMinutes + breakRange) ||
        (startMinutes + data.range > lunchStartMinutes && startMinutes < lunchEndMinutes);

      if (overlapsWithBreak) {
        startMinutes += data.range;
        continue;
      }

      let finalTime = newTime + " - " + newEndTime;// example : 09:00 - 09:15
      if(this.timeToMinutes(finalTime.split('-')[1].trimStart()) > endTimeInMinutes) {
        startMinutes += data.range;
        continue;
      }
      slots.push(finalTime);
      startMinutes += data.range;
    }

    return slots;
  }

  getStaffAndEvents() {
    return this.http.get<IStaffAndEvents>(this.allStaffURL,{withCredentials:true})
  }

  getAcceptedResponse() :Observable<AcceptedResponse>  {
    return this.http.get<AcceptedResponse>(environment.ACCEPTED_RESPONSE,{withCredentials:true});
  }

  requestSlotAvailability(data: i[]) {
    this.http.post(this.requestAvailability, data,{withCredentials:true}).subscribe({
      next : (res:any) => {
        this.snackBarService.openSnackBar(res.message);
        console.log(res);
      },
      error:(err : HttpErrorResponse)=> {
        console.log(err.error);
        this.snackBarService.openSnackBar(err.error.message);
      }
  });
  }

  getAllResponse() {
    return this.http.get<{ message: string, result: AllResponse[] }>(this._getAllResponse,{withCredentials:true})
  }

  openDialog(staffs: IStaff[], startDate: string, endDate: string , responseDeadline : Date ,
             forYear : string , eventTypeRequest : string,) {
    this.popover.open(ConfirmDialogComponent, {
      data: {
        forYear ,
        staffs: staffs, /*Arrays*/
        startDate: startDate,
        endDate: endDate , responseDeadline , eventTypeRequest
      }
    })
  }

  getIndividualResponse(staff: data) {
    // let id = (sessionStorage.getItem('loggedInUser'))
    let id = staff.id;
    return this.http.get<{ message: string, Result: Staff }>(`${environment.INDIVIDUAL_RESPONSE}/${id}`,{withCredentials:true})
  }

  /**
   * @Route api/v1/SuperAdmin/slots
   * @param data of type ISlot
   */
  postSlot(data : ISlot) : void {
    console.log(data);
    this.http.post(environment.SLOT , data , { withCredentials:true }).subscribe(e=>console.log(e));
  }

  /**
   * @HTTPMETHOD POST
   * @Route - api/v1/Events
   * @param eventInfo
   */
  createEvents(eventInfo :IEventInfo):Observable<{message : string , success:boolean}>{
    return this.http.post<{message : string , success:boolean}>(environment.CREATE_EVENT , eventInfo , {withCredentials : true});
  }

  getEvents() : Observable<{message : string , data ?: {Name:string}[]} > {
   return this.http.get<{message : string , data ?: {Name:string}[]} >(environment.EVENT_URL , {withCredentials : true})
  }


  getBreaks(){
    return this.http.get<IBaseResponse & { data :IBreaks[] }>(environment.BREAKS , {withCredentials:true})
  }
  getBreaksById(configurationID : string) {
    const params = new HttpParams().set('configurationID', configurationID);
    return this.http.get<IBaseResponse & {data : IBreaks}>(environment.BREAKS , { params , withCredentials : true})
  }
  postBreaks(breaks : IBreaks) {
    return this.http.post<IBaseResponse>(environment.BREAKS , breaks , { withCredentials:true }).subscribe({
      next : (response : IBaseResponse)=> {
        this.snackBarService.openSnackBar(response.message);
      },
      error : (e:HttpErrorResponse)=> {
        this.snackBarService.openSnackBar(e.message)
      }
    })
  }
}
