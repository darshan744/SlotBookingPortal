import { Component, computed, inject, Input, OnChanges, OnInit, signal, SimpleChanges, ViewChild } from '@angular/core';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatToolbarModule} from '@angular/material/toolbar'
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {  MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatListItem, MatListItemIcon, MatNavList } from '@angular/material/list';
import { MatIconButton } from '@angular/material/button';
import { CommonModule } from '@angular/common';
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

export class SidenavComponent implements OnInit, OnChanges {

  @ViewChild(MatSidenav) sidenav!:MatSidenav;
  ngOnChanges(changes: SimpleChanges): void {
    // console.log(changes);
    this.width();
    // this.res.observe(Breakpoints.Tablet).subscribe((response)=>console.log(response)
    // );
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
  collapsed = signal(true);
  width = computed(()=>{
    if(this.isHandset()){
      return this.collapsed()?'0px':'65px'
    }
    return this.collapsed()?'65px':'225px'
  });
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
