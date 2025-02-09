import { CommonModule } from '@angular/common';
import { Component, Inject, Input } from '@angular/core';
import { ToastrService } from '../../Services/Toastr/toastr.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css',
})
export class ToastComponent {
  @Inject(ToastrService)
  toastrService !: ToastrService;


}
