import { Component, inject } from '@angular/core';
import { LoadingService } from '../../Services/Loading/loading.service';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
    selector: 'app-loading',
    imports: [CommonModule, AsyncPipe],
    templateUrl: './loading.component.html',
    styleUrl: './loading.component.css'
})
export class LoadingComponent {

  loading : LoadingService = inject(LoadingService);
}
