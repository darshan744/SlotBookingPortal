
import { Component } from '@angular/core';
import { items, SidenavComponent } from '../../../Components/sidenav/sidenav.component';
import { MenuItem } from 'primeng/api';
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
  styleUrl: './superadmin.component.css',
})
export class SuperadminComponent {
  list: MenuItem[] = [
    { label: 'Dashboard', routerLink: 'Search', icon: 'dashboard' },
    { label: 'Request', routerLink: 'Create', icon: 'event' },
    { label: 'Settings', routerLink: 'settings', icon: 'settings' },
    { label: 'Status', routerLink: 'status', icon: 'pending_actions' },
    { label: 'Create-Slot', routerLink: 'slot', icon: 'schedule' },
  ];
  role: string = 'SuperAdmin';
}
