import { Component,computed,signal } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import {} from '@angular/material'
import { MatDrawer, MatDrawerContainer, MatDrawerContent, MatSidenav, MatSidenavContainer, MatSidenavContent, MatSidenavModule } from '@angular/material/sidenav';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatListItem, MatNavList } from '@angular/material/list';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HeaderComponent,
    MatSidenav,
    MatSidenavContainer,
    MatSidenavContent,
    MatIcon,
    MatIconButton,
    MatDrawer,
    MatDrawerContainer,
    MatDrawerContent,
    MatButton,
    MatIconButton,
    MatNavList,
    MatListItem,
    RouterOutlet,
    MatToolbar,
    MatButtonModule,
    MatSidenavModule,
    RouterLink,
    FormsModule,
    CommonModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  collapsed = signal(false);

  stylewidth = computed(()=>this.collapsed()?'65px':'250px');

  list = [{name:"Admin",
    path:'/admin'
  },
    {name:"User",path:'/user'}
  ]
}
