import { AfterViewInit, Component, inject, Input, OnInit, signal, ViewChild } from '@angular/core';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatToolbarModule} from '@angular/material/toolbar'
import {  Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {  MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatListItem, MatListItemIcon, MatNavList } from '@angular/material/list';
import { MatIconButton } from '@angular/material/button';
import { CommonModule} from '@angular/common';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout'
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
export interface items{
  name:string,
  path:string,
  icon:string
}
@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [MatToolbarModule,MatSidenavModule,MatIcon,RouterOutlet,RouterLink,RouterLinkActive,MatNavList,
    MatListItemIcon,MatListItem,MatIconModule,MatIconButton,CommonModule
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})

export class SidenavComponent implements OnInit,AfterViewInit {

  @ViewChild(MatSidenav) sidenav!:MatSidenav;

  ngAfterViewInit(): void {
    this.res.observe(["(max-width: 800px)"]).subscribe((response) => {
      if (response.matches) {
        this.isHandset.set(true);
        this.sidenav.mode = "over";
        this.sidenav.close();
      } else {
        this.sidenav.mode = "side";
        this.sidenav.open();
      }
    });
  }
  @Input() list:items[]=[];
  @Input() role:string='';
  private _http = inject(HttpClient);
  res = inject(BreakpointObserver)
  isHandset = signal(false);
  ngOnInit():void{
    this.res.observe(Breakpoints.Handset)
    .subscribe((response)=>{
      this.isHandset.set(response.matches);
    })
  }
  router = inject(Router);
  handleSignOut(){

    sessionStorage.removeItem('loggedInUser');
    this._http.post(`${environment.BASE_URL}/api/v1/logout`,{},{
      withCredentials:true
    }).subscribe(()=>{
      this.router.navigate(['/']).then(()=>{
        window.location.reload();
      })
    })
  }
}
