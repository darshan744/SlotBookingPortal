import {  Component, inject, OnInit ,ViewChild} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import {  MatInputModule } from '@angular/material/input';
import {   FormsModule,  } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../Services/AdminServices/admin-service.service';
import { IStudentInfo } from '../../../Models/Admin.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { environment } from '../../../../environments/environment.development';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import {FloatLabelModule} from 'primeng/floatlabel'
import {InputTextModule} from 'primeng/inputtext'
import { TableModule } from 'primeng/table';
interface IStudentData {
  id : string,
  name : string,
  email:string,
  year:string,
  department : string,
  resume : string,
}
@Component({
  selector: 'app-admin-student-search',
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    TableModule,
    FloatLabelModule,
  ],
  templateUrl: './admin-student-search.component.html',
  styleUrl: './admin-student-search.component.css',
})
export class AdminStudentSearchComponent implements OnInit {
  breakPointSubscription: Subscription | null = null;
  private _service = inject(AdminService);
  private _url = environment.BASE_URL;
  filterValue: string = '';
  spinner: boolean = false;
  data : IStudentData[] = [];
  displayColumns = ['Id', 'Name', 'Email', 'Department', 'Year', 'Resume'];
  ngOnInit(): void {
    this._service.getAllStudent().subscribe((e: IStudentInfo) => {
      this.data = e.data;
      this.spinner = false;
    });
  }

  url(fileLink: string) {
    return this._url + '/' + encodeURIComponent(fileLink);
  }
  isMobile: boolean = false;

  filter() {
    
  }
  ngOnDestroy() {
    if (this.breakPointSubscription) this.breakPointSubscription.unsubscribe();
  }
}
