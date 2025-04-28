import { SuperAdminService } from '../../../Services/SuperAdminServices/SlotGenerate/super-admin.service';
import { CommonModule, NgClass } from '@angular/common';
import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { data } from '../../../Models/slot-breaks';
import { DialogOpenService } from '../../../Services/DialogOpenService/dialog.service';
import { MatRipple } from '@angular/material/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { HttpErrorResponse } from '@angular/common/http';
import { DialogModule } from 'primeng/dialog';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { AccordionModule } from 'primeng/accordion';
import { ChipModule } from 'primeng/chip';
@Component({
  selector: 'app-status-tab',
  imports: [
    DialogModule,
    CardModule,
    TableModule,
    MatTableModule,
    MatIconModule,
    NgClass,
    MatPaginatorModule,
    CommonModule,
    TagModule,
    AccordionModule,
    DialogModule,
    ChipModule
  ],
  templateUrl: './status-tab.component.html',
  styleUrl: './status-tab.component.css',
})
export class StatusTabComponent implements AfterViewInit, OnInit {
  dataSource = new MatTableDataSource<data>();
  @ViewChild('paginator') paginator!: MatPaginator;
  constructor(
    private _dialogService: DialogOpenService,
    private _Service: SuperAdminService
  ) {}
  staffStatus: data[] = [];
  ngOnInit() {
    this._Service.getAllResponse().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res.result);
        this.staffStatus = res.result;
        console.log(this.staffStatus);
      },
      error: (err: HttpErrorResponse) => {
        this._dialogService.openSnackBar(err.message);
      },
    });
  }
  ngAfterViewInit(): void {
    this._Service.getAllResponse().subscribe((res: any) => {
      try {
        this.dataSource = new MatTableDataSource<data>(res.result);
        this.dataSource.paginator = this.paginator;
      } catch (e) {
        console.warn(e);
      }
    });
  }
  statusDetails: data[] = [];
  columns: string[] = [
    'id',
    'name',
    'phoneNumber',
    'email',
    'forYear',
    'eventType',
    'status',
  ];
  dialogData: any;
  showDialog = false;
  getIndividualResponse(id: string) {
    this._Service.getIndividualResponse(id).subscribe((e) => {
      this.dialogData = e.Result;
      console.log(e.Result)
      this.showDialog = true;
    });
  }
  onClick(staff: data) {
    // this._Service.getIndividualResponse(staff).subscribe({
    //   next: (e: any) => {
    //     this._dialogService.openStatusDialog(e);
    //   },
    //   error: (e: HttpErrorResponse) => {
    //     this._dialogService.openSnackBar(e.error.message);
    //   },
    // });
  }
}
