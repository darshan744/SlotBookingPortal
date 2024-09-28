import { AfterViewInit, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ChartOptions, ChartType } from 'chart.js';
import {BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-graphs',
  standalone: true,
  imports: [
    BaseChartDirective,MatCardModule
  ],
  templateUrl: './graphs.component.html',
  styleUrl: './graphs.component.css'
})
export class GraphsComponent implements AfterViewInit {
  
  ngAfterViewInit(): void {
  }
  

  Mock_Interview = {
    labels:[ '2024-08-01','2024-08-04','2024-08-07','2024-08-10' ],
    datasets:[
      {
        data:[8, 6 , 7 ,9],
        label:'Mock Interview',
        tension:0.323324,
        fill:true
      }
    ]
  }
  Self_Introduction = {
    labels:[ '2024-08-01','2024-08-04','2024-08-07','2024-08-10' ],
    datasets:[
      {
        data:[9, 5 , 8 ,6.5],
        label:'Self Introduction',
        tension:0.323324,
        fill:true
      }
    ]
    
  }
  Group_Discussion = {
    labels:[ '2024-08-01','2024-08-04','2024-08-07','2024-08-10' ],
    datasets:[
      {
        data:[6, 8 , 9 ,7],
        label:'Group Discussion',
        tension:0.323324,
        fill:true
      },
      
    ]
  }
  chartOptions:ChartOptions = {
    responsive:true,
    backgroundColor:'rgb(29,122,243)',
    borderColor:'rgb(29,122,243)',
    
    scales:{
      y:{
        beginAtZero:true,
        min:0,
        max:10,
      },
      
      
    },
  }
  type:ChartType = 'line';
  options:ChartOptions =  {
    responsive:true,
    scales:{
      y:{
        min:0,
        max:10
      }
    }
  }
  
}
