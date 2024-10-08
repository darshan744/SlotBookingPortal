import { Component ,viewChild,OnInit ,AfterViewInit,ElementRef} from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import {MatToolbar} from '@angular/material/toolbar'
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { MatDrawer, MatDrawerContainer, MatDrawerContent, MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { MatListItem, MatNavList } from '@angular/material/list';
import { MatAnchor, MatIconButton } from '@angular/material/button';
import { UserComponent } from '../user/user.component';
import { MatCard, MatCardContent } from '@angular/material/card';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbar,
    MatIcon,
    RouterLink,
    DashboardComponent,
    RouterOutlet,
    MatSidenav,
    MatSidenavContent,
    MatIcon,
    MatNavList,
    MatListItem,
    MatDrawer,
    MatDrawerContainer,
    MatDrawerContent,
    RouterLink,
    MatSidenavContainer,
    MatIconButton,
    MatAnchor,
    UserComponent,
    MatCardContent,
    MatCard
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private router:Router){}
  userdetails:any
  ngOnInit(){
    const details = sessionStorage.getItem('loggedInUser')
    if(details){
      this.userdetails = JSON.parse(details);
    }
  }
  // ngAfterViewInit(){
  //   const img = document.getElementById("me");
  //   const items = document.getElementById('items')!;
  //   img?.addEventListener('click',function(){
  //     if(items?.style.display==='none'){
  //       items.style.display = 'flex';
  //     }
  //     else{
  //       items.style.display = 'none';
  //     }
  //   })
  //   window.addEventListener('click',function(event:Event){
  //     if(!((event.target as Element).matches('#me'))){
  //       const menu = document.getElementById('items')!;
  //       if(menu?.style.display==='flex'){
  //         menu.style.display = 'none';
  //       }
  //     }
  //   })
  // }

  handleSignOut(){
    sessionStorage.removeItem('loggedInUser');
    this.router.navigate(['/']).then(()=>{
      window.location.reload();
    })
  }
  
}
