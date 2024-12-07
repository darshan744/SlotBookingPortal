import {  Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import {  MatInputModule } from '@angular/material/input';
import { FormControl,  ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout'
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { AdminService } from '../../Services/AdminServices/admin-service.service';
import { IStudentInfo } from '../../Models/Admin.model';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-admin-student-search',
  standalone: true,
  imports: [MatInputModule,CommonModule,MatFormFieldModule
    ,MatIcon,MatProgressSpinner,ReactiveFormsModule
  ],
  templateUrl: './admin-student-search.component.html',
  styleUrl: './admin-student-search.component.css'
})
export class AdminStudentSearchComponent {

  private _service = inject(AdminService);
  identifier : FormControl = new FormControl<string>('',[Validators.required])
  spinner : boolean = false;
  student:boolean = false;
  students : boolean = false;
  noStudent:boolean  = false;

  studentsInfo : IStudentInfo["data"] | null = null;
  search(){
    if(this.identifier.valid) {
      console.log(this.identifier.value);
      this.spinner = true;
      console.log('time in');

      setTimeout( function (this:AdminStudentSearchComponent) {
        this.spinner = true;
        console.log("timeout")
      }, 1000)
      const subscription :Subscription =  this._service.getStudentInfo(this.identifier.value)
         .subscribe((e:IStudentInfo)=> {
           this.studentsInfo = e.data;
           this.spinner = false;
         });
    }
    else {
      alert('Enter Either One')
    }
  }
}
