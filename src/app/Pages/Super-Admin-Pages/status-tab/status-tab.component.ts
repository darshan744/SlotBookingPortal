import { SuperAdminService } from '../../../Services/SuperAdminServices/SlotGenerate/super-admin.service';
import { CommonModule, NgClass } from '@angular/common';
import { AfterViewInit, Component,  ViewChild , OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { data } from '../../../Models/slot-breaks';
import { DialogOpenService } from '../../../Services/DialogOpenService/dialog.service';
import { MatRipple } from '@angular/material/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-status-tab',
  standalone: true,
  imports: [MatTableModule,MatIconModule,NgClass,MatRipple,MatPaginatorModule , CommonModule],
  templateUrl: './status-tab.component.html',
  styleUrl: './status-tab.component.css'
})
export class StatusTabComponent implements AfterViewInit , OnInit{


  dataSource = new MatTableDataSource<data>();
  @ViewChild("paginator") paginator!: MatPaginator;
  constructor(private _dialogService : DialogOpenService , private _Service : SuperAdminService){}


  ngOnInit() {
    this._Service.getAllResponse().subscribe({
      next:  (res) =>{
        this.dataSource = new MatTableDataSource(res.result);
      },
      error:  (err: HttpErrorResponse) =>{
        this._dialogService.openSnackBar(err.message);
      }
    });
  }
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
  columns: string[] = ['id', 'name', 'phoneNumber', 'email' ,'forYear' ,'eventType', 'status'];

  onClick(staff: data) {
    this._Service.getIndividualResponse(staff).subscribe({
      next: (e : any)=> {
        this._dialogService.openStatusDialog(e);
      },
      error : (e : HttpErrorResponse)=>{
        this._dialogService.openSnackBar(e.error.message);
      }
    })
  }
}
