
import { AfterViewInit, Component, inject, OnDestroy, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatColumnDef, MatHeaderCell, MatHeaderCellDef, MatRowDef, MatTableModule } from '@angular/material/table';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { NgClass } from '@angular/common';
import { Subscription } from 'rxjs';

export interface stdList{
  No:Number,
  Name:String,
  attendance:string,
  ispresent:boolean
  marks:number,
  remarks:string
}
@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [MatTableModule,MatColumnDef,MatRowDef,MatHeaderCell,MatHeaderCellDef,MatRowDef,MatRowDef
    ,MatCheckbox,MatButton,MatInput,MatLabel,MatFormField,FormsModule,NgClass
  ],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent{
  
  
  

  studentList: stdList[] = [
    { No: 1, Name: 'John Doe', attendance:'', ispresent:false,marks: NaN, remarks: '' },
    { No: 2, Name: 'Jane Smith',attendance:'', ispresent:false, marks: NaN,  remarks: '' },
    { No: 3, Name: 'Bob Johnson',attendance:'', ispresent:false, marks: NaN,  remarks: '' },
    { No: 4, Name: 'Alice Davis', attendance:'',ispresent:false, marks: NaN,  remarks: '' },
    { No: 5, Name: 'Charlie Brown', attendance:'',ispresent:false, marks: NaN, remarks: ''},
    { No: 6, Name: 'John Doe',attendance:'', ispresent:false, marks: NaN,  remarks: '' },
    { No: 7, Name: 'Jane Smith',attendance:'', ispresent:false, marks: NaN,  remarks: '' },
    { No: 8, Name: 'Bob Johnson',attendance:'', ispresent:false, marks: NaN,  remarks: '' },
    { No: 9, Name: 'Alice Davis',attendance:'',ispresent:false, marks: NaN,  remarks: '' },
    { No: 10,Name: 'Charlie Brown', attendance:'',ispresent:false, marks: NaN,  remarks: ''}
  ];
  displayedColumns: string[] = ['No', 'Name','attendance', 'marks', 'remarks','actions'];
  submitRow(student:stdList){
    console.log("specifc student",student);
  }
  // mobileheader = 'mobileheader';
  attendance(student:stdList){
    student.attendance = student.ispresent?'Present':'Absent'
    console.log(student.attendance);
  }
  submitAllRow(student:stdList[]){
    console.log("All Student",student);
  }
}
