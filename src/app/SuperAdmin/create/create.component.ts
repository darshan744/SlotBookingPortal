import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';




@Component({
  selector: 'app-create',
  standalone: true,
  imports: [MatFormField,MatInput,MatSelect,MatOption,MatLabel,CommonModule,FormsModule,MatIcon
    ,MatButtonModule
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {


  addVenue() {
    this.venue.push({ name: '', instructor: [{ name: '' }] });
  }

  EventName:string|null = null
  Batch:string|null = null

  events = ["MockInterview","SelfIntroduction","GroupDiscussion"]
  venue:{name:string , instructor:{name:string}[]}[] = []
  currentView: string = 'Search'; 

  addInstructor(venueIndex: number) {
    this.venue[venueIndex].instructor.push({ name: '' });
  }

  batches = ['2025','2026','2027','2028'];
  //searchBatch = this.list;
  routes =[{name:'Search',icon:'search'},{name:'CreateEvent',icon:'event'}]
  searchrollno:string=''
  searchbatch:string=''
  
  search(){
    console.log(this.searchbatch,this.searchrollno)
  }
}
