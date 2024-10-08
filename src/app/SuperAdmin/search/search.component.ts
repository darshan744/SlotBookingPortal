
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { BaseChartDirective } from 'ng2-charts';


@Component({
  selector: 'app-search',
  standalone: true,
  imports: [MatCardModule,BaseChartDirective
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

}
