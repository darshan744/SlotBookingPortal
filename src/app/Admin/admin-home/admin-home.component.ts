
import {  ViewChild, Component,  OnInit, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import {
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatRowDef,
  MatTableModule
} from '@angular/material/table';
import { AdminService } from '../../Services/AdminServices/admin-service.service';
import {catchError, map} from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';
export interface studentResult {
    id : string , name : string , attendance:string,
    ispresent:boolean,marks: number, remarks: string
}
@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [MatTableModule,MatColumnDef,MatRowDef,MatHeaderCell,MatHeaderCellDef,MatRowDef,MatRowDef
    ,MatCheckbox,MatButton,MatInput,MatLabel,MatFormField,FormsModule,CommonModule,
  ],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent implements OnInit{
  @ViewChild('shared') shared !: TemplateRef<any> ;
  eventType : string = '';
  ngOnInit(): void {

      this._service.getStudentList().pipe(
        map((e:any)=>{
          if(!e?.students) {
            return;
          }
          const eventType = e.eventType ?? '';
          let students = e.students.map((el:any) => ({
            id : el.studentId,
            name : el.name,
            ispresent : false,
            present : '',
            marks : 0,
            remarks : ''
          }))
        return {eventType , students}
        }),
        catchError(err => {
          console.error('Error occurred:', err);
          return of({ eventType: '', students: [] });
        })
      ).subscribe((res : any)=>{
        if(res) {
          console.log(res)
          this.eventType = res.eventType;
          this.studentData = res.students;
        }
      })
  }
  studentData : studentResult[] = []
  constructor(private _service : AdminService){}
  displayedColumns: string[] = ['No', 'Name','attendance', 'marks', 'remarks','actions'];
  submitRow(student:studentResult){
    this._service.studentMarks([student] , this.eventType)
    this.studentData = this.studentData.filter(std => std.id !== student.id)
  }
  attendance(student:studentResult){
    student.attendance = student.ispresent?'Present':'Absent'
    console.log(this.studentData);
  }
  submitAllRow(student:studentResult[]){
    this._service.studentMarks(student , this.eventType);
    console.log("All Student",student);
  }

}
