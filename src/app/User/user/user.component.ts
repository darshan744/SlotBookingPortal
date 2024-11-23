import { Component, computed, signal } from '@angular/core';
import { Router } from '@angular/router';
import { SidenavComponent } from "../../sidenav/sidenav.component";
import { UserService } from '../../Services/StudentService/user.service';
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [SidenavComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent  {
  collapsed = signal(true);
  width = computed(()=>this.collapsed()?'65px':'225px')
  constructor(private router:Router , _service : UserService){}
  list = [
    {name:"Dashboard",path:'dashboard',icon:'dashboard'},
    {name:"MockInterview",path:'Mi',icon:'business_center'},
    {name:"SelfIntroduction",path:'Si',icon:'account_circle'},
    {name:"GroupDiscussion",path:'Gd',icon:'group'}
  ]
  role:string='User'
  


}

