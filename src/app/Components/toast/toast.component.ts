import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, Inject, Input, TemplateRef, ViewChild } from '@angular/core';
import { ToastrService } from '../../Services/Toastr/toastr.service';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule , MatIcon , AsyncPipe],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css',
})
export class ToastComponent {

  constructor(public toastrService : ToastrService){}
}
