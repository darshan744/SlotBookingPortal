import {  Component, inject, Input, OnInit, } from '@angular/core';
import {  Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {  MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule} from '@angular/common';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout'
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import {ToolbarModule} from 'primeng/toolbar'
import { ButtonModule } from 'primeng/button';
export interface items{
  name:string,
  path:string,
  icon:string
}
@Component({
  selector: 'app-sidenav',
  imports: [
    ToolbarModule,
    MatSidenavModule,
    ButtonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    CommonModule,
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css',
})
export class SidenavComponent implements OnInit {
  @Input() list: items[] = [];
  @Input() role: string = '';
  router = inject(Router);
  private _http = inject(HttpClient);

  ngOnInit(): void {}

  handleSignOut() {
    sessionStorage.removeItem('loggedInUser');
    this._http
      .post(
        `${environment.BASE_URL}/api/v1/logout`,
        {},
        {
          withCredentials: true,
        }
      )
      .subscribe(() => {
        this.router.navigate(['/']).then(() => {
          window.location.reload();
        });
      });
  }
}
