import { Component, computed, inject, Input, signal } from '@angular/core';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatToolbarModule} from '@angular/material/toolbar'
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {  MatSidenavModule } from '@angular/material/sidenav';
import { MatListItem, MatListItemIcon, MatNavList } from '@angular/material/list';
import { MatIconButton } from '@angular/material/button';
import { CommonModule } from '@angular/common';
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

export class SidenavComponent {
  
  @Input() list:items[]=[];
  @Input() role:string='';

  router = inject(Router);
  collapsed = signal(true);
  width = computed(()=>this.collapsed()?'65px':'225px');

  
  


  handleSignOut(){
    sessionStorage.removeItem('loggedInUser');
    this.router.navigate(['/']).then(()=>{
      window.location.reload();
    })
  }
}