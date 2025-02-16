import { Component, inject  } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule,  } from '@angular/material/dialog';
import { MatDivider } from '@angular/material/divider';
import { UserService } from '../../Services/StudentService/user.service';
@Component({
    selector: 'app-dialog',
    imports: [MatDialogModule, MatButton, MatDivider],
    templateUrl: './booking-dialog.component.html',
    styleUrl: './booking-dialog.component.css'
})
export class BookingDialogComponent {
  constructor(private _Service : UserService){}
  data :{time : string , date :string ,eventType : string , venue:string,slotId : string} = inject(MAT_DIALOG_DATA);
  bookSlot() {
    // this._Service.bookSlot(this.data);
  }
}
