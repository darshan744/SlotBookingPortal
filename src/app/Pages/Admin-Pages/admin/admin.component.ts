import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { Router } from '@angular/router';
import { SidenavComponent } from '../../../Components/sidenav/sidenav.component';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-admin',
  imports: [CommonModule, SidenavComponent],
  templateUrl: './admin.component.html',
})
export class AdminComponent {
  collapsed = signal(true);
  constructor(private router: Router) {}
  sidenavwidth = computed(() => (this.collapsed() ? '65px' : '250px'));
  pages: MenuItem[] = [
    { label: 'Home', routerLink: 'Home', icon: 'pi pi-home' },
    { label: 'Students', routerLink: 'studentSearch', icon: 'pi pi-user' },
    { label: 'Your Events', routerLink: 'Events', icon: 'pi pi-calendar-plus' },
  ];

  handleSignOut() {
    sessionStorage.removeItem('loggedInUser');
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }
  role: string = 'Admin';
}
