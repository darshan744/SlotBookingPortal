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
  standalone: true,
  imports: [MatInputModule,CommonModule,MatFormFieldModule , MatPaginator
    ,MatProgressSpinner,FormsModule,MatTableModule
  ],
  templateUrl: './admin-student-search.component.html',
  styleUrl: './admin-student-search.component.css'
})
export class AdminStudentSearchComponent implements OnInit {

  @ViewChild('paginator') paginator !: MatPaginator;

  private _service = inject(AdminService);
  private _url = environment.BASE_URL
  filterValue : string = '';
  spinner : boolean = false;
  studentData = new MatTableDataSource<IStudentData>();
  displayColumns = ['Id' , 'Name' , 'Email' , 'Department' , 'Year' ,'Resume']
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
      this.spinner = true;
      this._service.getAllStudent().subscribe((e:IStudentInfo)=> {
          this.studentData = new MatTableDataSource(e.data);
          this.studentData.paginator = this.paginator;
          console.log(this.studentData)
           this.spinner = false;
         });
  }

  url(fileLink : string) {
    return this._url + "/" + encodeURIComponent(fileLink);
  }

  filter () {
    this.studentData.filter = this.filterValue
    this.studentData.paginator?.firstPage()
  }
}
