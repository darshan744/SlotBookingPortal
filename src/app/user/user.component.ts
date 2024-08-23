import { Component, computed, signal } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { MatCard, MatCardContent, MatCardHeader, MatCardImage } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import {MatToolbar} from '@angular/material/toolbar'
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import {  MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { MatListItem, MatListItemIcon, MatNavList } from '@angular/material/list';
import { MatAnchor, MatIconButton } from '@angular/material/button';
import { CommonModule, NgFor } from '@angular/common';
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    HeaderComponent,
    MatCard,
    MatCardContent,
    MatCardImage,
    MatCardHeader,
    MatSidenav, MatSidenavContainer, MatSidenavContent,
    MatListItem, MatNavList,
    DashboardComponent, MatAnchor, MatIconButton, RouterLink, RouterOutlet,MatToolbar,MatIcon,RouterLinkActive
    ,CommonModule,NgFor,MatListItemIcon
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  collapsed = signal(false);
  
  width = computed(()=>this.collapsed()?'65px':'225px')
  
  constructor(private router:Router){}
  list = [
    {name:"Dashboard",path:'dashboard',icon:'dashboard'},
    {name:"MockInterview",path:'Mi',icon:'business_center'},
    {name:"SelfIntroduction",path:'Si',icon:'account_circle'},
    {name:"GroupDiscussion",path:'Gd',icon:'group'}
  ]
  handleSignOut(){
    sessionStorage.removeItem('loggedInUser');
    this.router.navigate(['/']).then(()=>{
      window.location.reload();
    })
  }
  }

