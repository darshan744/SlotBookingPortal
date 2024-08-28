import { CommonModule } from '@angular/common';
import { Component,signal,computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatListItem, MatListItemIcon, MatNavList } from '@angular/material/list';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SearchComponent } from '../search/search.component';

interface instructor{
  name:string,
  id:string,
  No:string
  Mail:string
}

interface venue {
  venue:string,
  instructors:instructor[]
}

interface event{
  eventName:string,
  venue:venue[]
}
@Component({
  selector: 'app-superadmin',
  standalone: true,
  imports: [MatFormField,MatLabel,MatSelect,MatOption,FormsModule,CommonModule,MatInput
    ,MatToolbar,MatIcon,MatIconButton,MatSidenavModule,MatNavList,MatListItem,RouterLink,RouterOutlet
  ,RouterLinkActive,MatListItemIcon,MatButton,FormsModule,SearchComponent],
  templateUrl: './superadmin.component.html',
  styleUrl: './superadmin.component.css'
})
export class SuperadminComponent {

  collapsed = signal(false);

  sidenavwidth = computed(()=> this.collapsed()?'65px':'250px')
  EventName:string|null = null
  Batch:string|null = null

  events = ["MockInterview","SelfIntroduction","GroupDiscussion"]
  venue:{name:string , instructor:{name:string}[]}[] = []
  currentView: string = 'Search'; 

  constructor(private router:Router){ this.venue.push({ name: '', instructor: [{ name: '' }] });
}
switchView(view: string) {
  this.currentView = view;
}

handleSignOut(){
  sessionStorage.removeItem('loggedInUser');
  this.router.navigate(['/']).then(()=>{
    window.location.reload();
  })
}
  addVenue() {
    this.venue.push({ name: '', instructor: [{ name: '' }] });
  }

  addInstructor(venueIndex: number) {
    this.venue[venueIndex].instructor.push({ name: '' });
  }

  list = ['2025','2026','2027','2028'];
  searchBatch = this.list;
  routes =[{name:'Search',icon:'search'},{name:'CreateEvent',icon:'event'}]
  searchrollno:string=''
  searchbatch:string=''
  
  search(){
    console.log(this.searchbatch,this.searchrollno)
  }
}
