import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginService } from './Services/LoginService/login.service';
import { inject } from '@angular/core';
import { ToastComponent } from "./Components/toast/toast.component";
import { LoadingComponent } from "./Components/loading/loading.component";
@Component({
    selector: 'app-root',
    imports: [RouterOutlet, CommonModule, ToastComponent, LoadingComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SlotBookingPortal';
  loginService = inject(LoginService);
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.loginService.handleSignOut();
  }

}
