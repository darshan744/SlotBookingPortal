import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, Inject, Input, TemplateRef, ViewChild } from '@angular/core';
import { ToastrService } from '../../Services/Toastr/toastr.service';
import { MatIcon } from '@angular/material/icon';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule , MatIcon , AsyncPipe],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css',
})
export class ToastComponent {
  isHandset : boolean = false;
  isHandsetSubscription : Subscription | null = null;
  constructor(public toastrService : ToastrService , private breakPointObserver:BreakpointObserver){}
  ngOnInit() {
    this.isHandsetSubscription = this.breakPointObserver.observe(Breakpoints.Handset)
    .subscribe((res)=>this.isHandset = res.matches);
  }
  ngOnDestroy() {
    this.isHandsetSubscription?.unsubscribe();
  }
}
