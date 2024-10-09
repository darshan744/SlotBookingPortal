import { inject, Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "../../User/dialog/dialog.component";

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
    
    readonly popOver = inject(MatDialog)

    openDialog(selectedTiming:string,selectedDate:string) {
        this.popOver.open(DialogComponent, {
            width:'320px',height:'250px',
            data:{timing : selectedTiming,
                    date:selectedDate
                }
        })
    }

}