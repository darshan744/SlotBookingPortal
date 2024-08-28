import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOption } from '@angular/material/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [MatFormField,FormsModule,MatButtonModule
    ,MatLabel,MatOption,MatIcon,CommonModule,MatInput,MatSelect
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

  searchrollno:string=''
  searchbatch:string=''

  list = ['2025','2026','2027','2028'];
  search(){
    console.log(this.searchbatch,this.searchrollno)
  }
}
