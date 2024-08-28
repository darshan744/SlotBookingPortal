import { AfterViewInit, Component } from '@angular/core';
import { MatFormField, MatFormFieldControl, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButton, MatFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
@Component({
  selector: 'app-admin-student-search',
  standalone: true,
  imports: [MatFormField,MatLabel,MatInput,MatSelect,MatOption,FormsModule,CommonModule
    ,MatButton,MatFabButton,MatIcon
  ],
  templateUrl: './admin-student-search.component.html',
  styleUrl: './admin-student-search.component.css'
})
export class AdminStudentSearchComponent {
  Batch:string|null=null;
  Search:string|null=null
  list = ['2025','2026','2027','2028'];
  

  search(){
    if(this.Batch === null || this.Search=== null){
      alert("Please Select A Input");
    }
    else{
      console.log(this.Batch , this.Search)
    }
  }
}
