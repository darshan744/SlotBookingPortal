import {inject, Injectable, TemplateRef} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { BookingDialogComponent } from "../../Components/BookingDialog/booking-dialog.component";
import { ConfirmDialogComponent } from "../../Components/confirm-dialog/confirm-dialog.component";
import { StatusDialogComponent } from "../../Components/status-dialog/status-dialog.component";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ToastComponent } from "../../Components/toast/toast.component";

@Injectable({
    providedIn:'root'
})
 /* TYPES OF INJECTION CAN BE DONE :
    To Use this service inject with @Inject() or else use inject()signal or else use private param in constructor.
    if we use private param in constructor the service will not be available with html file
    so we have to write another method to call that service here.But with either
    @Inject or inject() we are just defining a property and we can access the method with just
    dialogService.openDialog() but in-case of private param in constructor
    private property is only available within the class. So to access that private member we define
    another method.
  */
export class DialogOpenService {

  private snackBar = inject(MatSnackBar);
    readonly popOver = inject(MatDialog)

    openBookingSlotDialog(time:string,date:string,eventType:string , venue : string,slotId : string) {
        this.popOver.open(BookingDialogComponent, {
            width:'320px',height:'250px',
            data:{time,date,eventType ,venue ,slotId}
        })
    }

    openDialogWithTemplate (template : TemplateRef<any> , data : any) {
      this.popOver.open(template , {
        data:data,
        width: '600px',height : '350px'
      })
    }

    openSlotDialog(staffs : string[] , slots : string[],
        startDate : string , endDate : string
      ) {
        this.popOver.open(ConfirmDialogComponent , {
          data : { staffs : staffs , slots : slots , /*Arrays*/
             startDate : startDate , endDate : endDate }
        })
      }
    openStatusDialog(data : any) {
        this.popOver.open(StatusDialogComponent, {
          data : data.Result ,
          width : '650px',height:'auto'
        })
      }
    openSnackBar(message : string) {
      this.snackBar.open(message , '✖️', {
        duration : 2500,
        panelClass : ['custom-snackbar'],
        verticalPosition:'top',
        horizontalPosition:'right'
      })
    }

}
