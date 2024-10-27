import {  Injectable,inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../SuperAdmin/confirm-dialog/confirm-dialog.component';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { data, staffs } from '../../../Models/slot-breaks';
type slotData = {
  staffs : staffs["staffs"],
    startDate : string , endDate : string
}
interface Slot {
  time: string;
  isAvailable: string; // "Accepted" or "Declined"
}

interface AvailableSlot {
  date: string; // Or Date if you prefer
  slots: Slot[];
}

interface Staff {
  availableSlots: AvailableSlot[];
  staffId: string;
  name: string;
}

type AllResponse = {
      staffId: string,
      phoneNumber: string,
      name: string,
      email: string,
      unmodifiedCount: number
}
@Injectable({
  providedIn: 'root'
})
export class SlotGenerateService {

  private allStaffURL = `${environment.BASE_SUPERADMIN_URL}/getAllStaff`;
  private requestAvailability = `${environment.AVAILABILITY_REQUEST_}`
  private _getAllRespnose = environment.GETALLREQUEST;
  constructor(private http : HttpClient) { }
  readonly popover = inject(MatDialog);

  getAllStaff() {
     return this.http.get<staffs>(this.allStaffURL)
  }
  requestSlotAvailability(data : slotData) {
    this.http.post(this.requestAvailability, data).subscribe(res=>{
      console.log(res);
    });
  }
  getAllResponse() {
   return this.http.get<{message : string ,result:AllResponse[]}>(this._getAllRespnose)
  }
  openDialog(staffs : staffs["staffs"] , slots : string[],
    startDate : string , endDate : string
  ) {
    this.popover.open(ConfirmDialogComponent , {
      data : { staffs : staffs , /*Arrays*/
         startDate : startDate , endDate : endDate }
    })
  }
  getIndividualResponse(staff : data) {
    // let id = (sessionStorage.getItem('loggedInUser'))
    let id = staff.staffId;
    return this.http.get<{message : string , Result : Staff}>(`${environment.INDIVIDUALRESPONSE}/${id}`)
  }
}
