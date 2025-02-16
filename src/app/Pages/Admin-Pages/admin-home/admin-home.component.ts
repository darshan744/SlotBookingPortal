
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
import { AdminService } from '../../../Services/AdminServices/admin-service.service';
import {catchError, map} from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';
export interface studentResult {
    id : string , name : string , attendance:string,
    ispresent:boolean,marks: number, remarks: string
}
@Component({
    selector: 'app-admin-home',
    imports: [MatTableModule, MatColumnDef, MatRowDef, MatHeaderCell, MatHeaderCellDef, MatRowDef, MatRowDef,
        MatCheckbox, MatButton, MatInput, MatLabel, MatFormField, FormsModule, CommonModule,
    ],
    templateUrl: './admin-home.component.html',
    styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent implements OnInit{
  @ViewChild('shared') shared !: TemplateRef<any> ;
  eventType : string = '';
  ngOnInit(): void {
      this._service.getStudentList().pipe(
        map(e=> ({...e , students : e.students.map(std =>
          ({id : std.id , name:std.name , attendance:'',
            ispresent:false,marks: 0, remarks: ''}))}))
      ).subscribe((res)=>{
        if(res) {
          (res)
          this.eventType = res.eventType;
          this.studentData = res.students;
        }
      })
  }
  studentData : studentResult[] = []
  constructor(private _service : AdminService){}
  displayedColumns: string[] = ['No', 'Name','attendance', 'marks', 'remarks','actions'];

  submitRow(student:studentResult){
    (this.eventType);
    this._service.studentMarks([student] , this.eventType)
    this.studentData = this.studentData.filter(std => std.id !== student.id)
  }

  attendance(student:studentResult){
    student.attendance = student.ispresent?'Present':'Absent'
  }

  submitAllRow(student:studentResult[]){
    this._service.studentMarks(student , this.eventType);
  }

}
