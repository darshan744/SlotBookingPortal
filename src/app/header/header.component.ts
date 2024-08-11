import { Component ,viewChild,OnInit ,AfterViewInit,ElementRef} from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import {MatToolbar} from '@angular/material/toolbar'
import { RouterLink } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbar,
    MatIcon,
    RouterLink,
    DashboardComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  
  userdetails:any
  ngOnInit(){
    const details = sessionStorage.getItem('loggedInUser')
    if(details){
      this.userdetails = JSON.parse(details);
    }
  }
  ngAfterViewInit(){
    const img = document.getElementById("me");
    const items = document.getElementById('items')!;
    img?.addEventListener('click',function(){
      if(items?.style.display==='none'){
        items.style.display = 'flex';
      }
      else{
        items.style.display = 'none';
      }
    })
    window.addEventListener('click',function(event:Event){
      if(!((event.target as Element).matches('#me'))){
        const menu = document.getElementById('items')!;
        if(menu?.style.display==='flex'){
          menu.style.display = 'none';
        }
      }
    })
  }
  
}
