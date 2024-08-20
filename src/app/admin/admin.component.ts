import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatAnchor, MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListItem, MatNavList } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [MatToolbarModule,MatIconModule,MatSidenavModule,
    MatNavList,RouterLink,RouterOutlet,RouterLinkActive,MatAnchor,CommonModule,
    MatListItem,MatIconButton
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  list  = [
    {name:'Home',path:'Home'},
    {name:'Students',path:'search'},
    {name:'Your Events',path:'Events'},
  ]
}
