import {  Component, inject, OnInit ,ViewChild} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import {  MatInputModule } from '@angular/material/input';
import { FormControl,  FormsModule,  ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { AdminService } from '../../../Services/AdminServices/admin-service.service';
import { IStudentInfo } from '../../../Models/Admin.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { environment } from '../../../../environments/environment.development';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
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
    imports: [MatInputModule, CommonModule, MatFormFieldModule, MatPaginator,
        FormsModule, MatTableModule
    ],
    templateUrl: './admin-student-search.component.html',
    styleUrl: './admin-student-search.component.css'
})
export class AdminStudentSearchComponent implements OnInit {

  @ViewChild('paginator') paginator !: MatPaginator;
  breakpointObserver : BreakpointObserver = inject(BreakpointObserver);
  breakPointSubscription : Subscription | null = null;
  private _service = inject(AdminService);
  private _url = environment.BASE_URL
  filterValue : string = '';
  spinner : boolean = false;
  studentData = new MatTableDataSource<IStudentData>();
  displayColumns = ['Id' , 'Name' , 'Email' , 'Department' , 'Year' ,'Resume']
  ngOnInit(): void {
     this.breakPointSubscription = this.breakpointObserver.observe(['(max-width: 1080px)']).subscribe((res) => {
        if(res.matches) {
          this.isMobile = true;
          this.studentData.paginator?.firstPage();
        }
        else {
          this.isMobile = false;
          this.studentData.paginator?.firstPage();
        }
      });
      this.spinner = true;
      this._service.getAllStudent().subscribe((e:IStudentInfo)=> {
          this.studentData = new MatTableDataSource(e.data);
          this.studentData.paginator = this.paginator;
           this.spinner = false;
         });
  }

  url(fileLink : string) {
    return this._url + "/" + encodeURIComponent(fileLink);
  }
  isMobile : boolean = false;

  filter () {
    this.studentData.filter = this.filterValue
    this.studentData.paginator?.firstPage()
  }
  ngOnDestroy() {
    if(this.breakPointSubscription)
    this.breakPointSubscription.unsubscribe();
  }
}
