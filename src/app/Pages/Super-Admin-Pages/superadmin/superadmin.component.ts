
import { Component } from '@angular/core';
import { items, SidenavComponent } from '../../../Components/sidenav/sidenav.component';
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
    imports: [SidenavComponent],
    templateUrl: './superadmin.component.html',
    styleUrl: './superadmin.component.css'
})
export class SuperadminComponent {
  list:items[] =[{name:'Dashboard',path:'Search',icon:'dashboard'},
    {name:'Request',path:'Create',icon:'event'},
    {name:'Settings', path:'settings',icon:'settings'},
    {name:'Status',path:'status',icon:'pending_actions'},
    {name:'Create-Slot',path:'slot',icon:'schedule'}]
  role:string='SuperAdmin';
}
