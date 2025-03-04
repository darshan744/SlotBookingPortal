import { Component, computed, signal } from '@angular/core';
import { Router } from '@angular/router';
import { SidenavComponent } from "../../../Components/sidenav/sidenav.component";
import { UserService } from '../../../Services/StudentService/user.service';
import { map, pipe } from 'rxjs';
@Component({
    selector: 'app-user',
    imports: [SidenavComponent],
    templateUrl: './user.component.html',
    styleUrl: './user.component.css'
})
export class UserComponent  {
  collapsed = signal(true);
  width = computed(()=>this.collapsed()?'65px':'225px')
  constructor(private router:Router ,private _service : UserService){}
  ngOnInit(): void {
    this._service.getEvents()
    // .pipe(
      // map((el:any)=>({name:el.name , path:`Events/${el.name}`,icon:"Business_center"})))
      .subscribe((e : {message : string , data : {Name:string}[] })=> {
      this.events = e;
      (e);
      this.events = e.data.map((el : {Name:string})=>({name:el.Name , path:`Events/${el.Name.replace(' ','_')}`,icon:"event"}));
      this.list.push({name:"Dashboard",path:'dashboard',icon:'dashboard'},
      ...this.events)
    });
  }
  list : any= []
  role:string='User'
  events :any = []
}

