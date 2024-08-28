import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { MatAnchor, MatIconButton } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatListItem, MatListItemIcon, MatNavList } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import {  MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SidenavComponent } from '../../sidenav/sidenav.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [MatToolbarModule,MatIconModule,MatSidenavModule,
    MatNavList,RouterLink,RouterOutlet,RouterLinkActive,MatAnchor,CommonModule,
    MatListItem,MatIconButton,MatListItemIcon,SidenavComponent
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  collapsed = signal(true);
 constructor(private router:Router){}
  sidenavwidth = computed(()=> this.collapsed()?'65px':'250px')
  list  = [
    {name:'Home',path:'Home',icon:'home'},
    {name:'Students',path:'studentSearch',icon:'dashboard'},
    {name:'Your Events',path:'Events',icon:'event'},
  ]

  handleSignOut(){
    sessionStorage.removeItem('loggedInUser');
    this.router.navigate(['/']).then(()=>{
      window.location.reload();
    })
  }
  role:string='Admin';
}
