import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { data } from '../../Models/slot-breaks';
import { DialogOpenService } from '../../Services/DialogOpenService/dialog.service';
import { SuperAdminService } from '../../Services/SuperAdminServices/SlotGenerate/super-admin.service';
import { MatRipple } from '@angular/material/core';

@Component({
  selector: 'app-status-tab',
  standalone: true,
  imports: [MatTableModule,MatIconModule,NgClass,MatRipple],
  templateUrl: './status-tab.component.html',
  styleUrl: './status-tab.component.css'
})
export class StatusTabComponent {


  constructor(private _dialogService : DialogOpenService , private _Service : SuperAdminService){}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this._Service.getAllResponse().subscribe((res : any) =>{
      try {
        this.statusDetails = res.result;
      } catch (e) {
        console.warn(e);
      }
    });
  }
  statusDetails: data[] = [];
  columns: string[] = ['id', 'name', 'phoneNumber', 'email', 'status'];

  onClick(staff: data) {
    this._dialogService.openStatusDialog(staff);  
  }
}
