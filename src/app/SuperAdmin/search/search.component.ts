import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [MatFormField,FormsModule
    ,MatLabel,MatOption,MatIcon,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

  searchrollno:string=''
  searchbatch:string=''
  search(){
    console.log(this.searchbatch,this.searchrollno)
  }
}
