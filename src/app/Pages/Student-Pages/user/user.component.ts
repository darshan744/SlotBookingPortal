import { Component, computed, signal } from '@angular/core';
import { Router } from '@angular/router';
import { SidenavComponent } from '../../../Components/sidenav/sidenav.component';
import { UserService } from '../../../Services/StudentService/user.service';
import { MenuItem } from 'primeng/api';
@Component({
  selector: 'app-user',
  imports: [SidenavComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  pages: MenuItem[] = [];
  constructor(private router: Router, private _service: UserService) {}
  ngOnInit(): void {
    console.log('User ONINIT');
    this._service
      .getEvents()
      .subscribe((e: { message: string; data: { Name: string }[] }) => {
        this.pages.push({
          label: 'Dashboard',
          routerLink: 'dashboard',
          icon: 'pi pi-objects-column',
        });
        const pages : MenuItem[] = e.data.map((el : {Name : string})=> ({
          label:el.Name,
          icon:"pi pi-calendar-plus",
          routerLink:`Events/${el.Name.replace(" " ,"_")}`
        }))
        this.pages.push({
          label: 'Events',
          icon: 'pi pi-calendar-plus',
          items:pages,
        });
      });
    console.log(this.pages);
  }
  role: string = 'User';
}
