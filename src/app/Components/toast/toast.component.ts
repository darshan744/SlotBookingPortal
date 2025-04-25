import {  CommonModule } from '@angular/common';
import { Component,} from '@angular/core';
import { ToastrService } from '../../Services/Toastr/toastr.service';
import { Subscription } from 'rxjs';
import {ToastModule} from 'primeng/toast'
@Component({
  selector: 'app-toast',
  imports: [CommonModule,ToastModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css',
})
export class ToastComponent {
  isHandset: boolean = false;
  isHandsetSubscription: Subscription | null = null;
  constructor(
    public toastrService: ToastrService,
  ) {}

}
