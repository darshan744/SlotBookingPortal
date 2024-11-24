import { NgClass } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { data } from '../../Models/slot-breaks';
import { DialogOpenService } from '../../Services/DialogOpenService/dialog.service';
import { SuperAdminService } from '../../Services/SuperAdminServices/SlotGenerate/super-admin.service';
import { MatRipple } from '@angular/material/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-status-tab',
  standalone: true,
  imports: [MatTableModule,MatIconModule,NgClass,MatRipple,MatPaginatorModule],
  templateUrl: './status-tab.component.html',
  styleUrl: './status-tab.component.css'
})
export class StatusTabComponent {

  dataSource = new MatTableDataSource<data>();
  @ViewChild("paginator") paginator!: MatPaginator;
  constructor(private _dialogService : DialogOpenService , private _Service : SuperAdminService){}
  ngAfterViewInit(): void {
    this._Service.getAllResponse().subscribe((res : any) =>{
      try {
        this.dataSource = new MatTableDataSource<data>(res.result);
        this.dataSource.paginator = this.paginator;
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
