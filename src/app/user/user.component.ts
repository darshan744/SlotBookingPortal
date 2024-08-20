import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { MatCard, MatCardContent, MatCardHeader, MatCardImage } from '@angular/material/card';
import { LoginService } from '../login.service';
import { MatIcon } from '@angular/material/icon';
import {MatToolbar} from '@angular/material/toolbar'
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { MatDrawer, MatDrawerContainer, MatDrawerContent, MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { MatListItem, MatNavList } from '@angular/material/list';
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
    MatDrawer, MatDrawerContainer, MatDrawerContent, MatSidenav, MatSidenavContainer, MatSidenavContent,
    MatListItem, MatNavList,
    DashboardComponent, MatAnchor, MatIconButton, RouterLink, RouterOutlet,MatToolbar,MatIcon,RouterLinkActive
    ,CommonModule,NgFor
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  constructor(){}
  list = [
    {name:"Dashboard",path:'dashboard'},
    {name:"MockInterview",path:'Mi'},
    {name:"SelfIntroduction",path:'Si'},
    {name:"GroupDiscussion",path:'Gd'}
  ]
  }

