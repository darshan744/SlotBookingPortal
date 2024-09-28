import { Component } from '@angular/core';
import { MatSidenavContent } from '@angular/material/sidenav';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatButtonModule, MatIconButton } from '@angular/material/button';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBar } from '@angular/material/progress-bar';
import { BaseChartDirective } from 'ng2-charts'
import { MatCardModule } from '@angular/material/card';
import { GraphsComponent } from "./graphs/graphs.component";

export interface history{
  No:number
  eventName:string,
  date:string,
  marks:number,
  remarks:string
}


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatSidenavContent, BaseChartDirective,
    MatIcon, MatCardModule,
    MatIconButton,
    MatButton,
    MatIconButton,
    RouterOutlet,
    MatButtonModule,
    RouterLink,
    FormsModule,
    CommonModule,
    RouterLink,
    MatTableModule, MatProgressBar, MatButton,
    GraphsComponent
],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  

  HISTORY_DATA: history[] = [
    { No:1, eventName: 'Mock Interview', date: '2024-08-01', marks: 8, remarks: 'Improve answers' },
    { No:2, eventName: 'Group Discussion', date: '2024-08-02', marks: 7, remarks: 'Contribute more effectively' },
    { No:3, eventName: 'Self Introduction', date: '2024-08-03', marks: 9, remarks: 'Be more concise' },
    { No:4, eventName: 'Mock Interview', date: '2024-08-04', marks: 6, remarks: 'Practice speaking clearly' },
    { No:5, eventName: 'Group Discussion', date: '2024-08-05', marks: 10, remarks: 'Excellent participation' },
    { No:6, eventName: 'Self Introduction', date: '2024-08-06', marks: 5, remarks: 'Work on confidence' },
    { No:7, eventName: 'Mock Interview', date: '2024-08-07', marks: 7, remarks: 'Focus on body language' },
    { No:8, eventName: 'Group Discussion', date: '2024-08-08', marks: 0, remarks: 'Absent' },
    { No:9, eventName: 'Self Introduction', date: '2024-08-09', marks: 8, remarks: 'Practice delivery' },
    { No:10, eventName:'Mock Interview', date: '2024-08-10', marks: 9, remarks: 'Better time management' }
  ];



  columns:string[] = ['No','eventName','date','marks','remarks']
  detais:any;
  ngOnInit(){
    this.detais = (sessionStorage.getItem('loggedInUser'));
    this.detais = JSON.parse(this.detais)
  }
  upcomingevents=[
    {name:'GroupDiscussion',date:'24/JUN'},
  ]


}
