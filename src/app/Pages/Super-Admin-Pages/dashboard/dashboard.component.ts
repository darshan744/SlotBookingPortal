import { CommonModule, DatePipe , KeyValuePipe} from '@angular/common';
import {Component, OnInit ,inject} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ChartData, ChartOptions, } from 'chart.js';
import { BaseChartDirective, } from 'ng2-charts';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {SuperAdminService} from "../../../Services/SuperAdminServices/SlotGenerate/super-admin.service";
import {HttpErrorResponse} from "@angular/common/http";
import {MatPaginator} from "@angular/material/paginator";
import {ISlot} from "../SuperAdmin.interface";
export interface IDashboard {
  totalEvents:number;
  events : {[key:string]: ISlot};
  slots : {
    slotId: string,
    startDate: Date,
    endDate: Date,
    eventType: string,
  }[];
  groupedEvents : {
    event:string;
    numberOfEvents:number;
  }[];
  students : {
    id : string ,
    name : string ,
    department : string ,
    eventHistory : {key : string , avg : number }[]
  }[]
}
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatCardModule,MatFormFieldModule,MatInputModule,BaseChartDirective,DatePipe,
    MatExpansionModule,FormsModule,MatButtonModule,MatIconModule,CommonModule,MatTableModule
  ],

  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class Dashboard implements OnInit {
  array = ['first year' , 'Second Year' , 'Third Year' , 'Fourth Year' ];
  eventTypes :string[] = ['January', 'February', 'March', 'April', 'May', 'June']
  chartData :ChartData<'line'> = {
    labels:this.eventTypes ,
    datasets: [
      {
        label: 'Mock Interviews',
        data: [65, 59, 80, 81, 56, 55],
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.4, // Smooth curves
      },
      {
        label: 'Self Introductions',
        data: [28, 48, 40, 19, 86, 27],
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        tension: 0.4,
      },
      {
        label: 'Group Discussions',
        data: [35, 40, 60, 47, 88, 60],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
      }
    ],
  };
  chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins:{
      tooltip:{
        callbacks:{
          label:(c)=>`${c.dataset.label} : ${c.raw}`
        }
      }
    },
    scales: {
      x: {
        ticks: {
          font: { size: 12 },
        },
      },
      y: {
        beginAtZero:true
      },
    },
  };
  service : SuperAdminService = inject(SuperAdminService);
  events:string[] = [];
  studentData : IDashboard | null = null;

  dataSource:MatTableDataSource<any> = new MatTableDataSource<any>();
  ngOnInit(): void {
    this.service.dashboard().subscribe({
      next:  (res : IDashboard) =>{
        console.log(res);
        this.studentData = res;
      },
      error : (err : HttpErrorResponse) =>{
        console.log(err);
      }
    })
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    const events = ['Id' , 'Name' , 'Year' , 'Department','MockInterview', 'SelfIntroduction', 'GroupDiscussion'];

    this.events = events;
    // Simulated data
    const data = [
      {
        Name: 'John Doe',
        Id:'7376221EC135',
        Department:'ECE',
        Year:"First Year",
        MockInterview: 85,
        SelfIntroduction: 90,
        GroupDiscussion: 80,
      },
      {
        Name: 'Jane Smith',
        Id:'7376221EC134',
        Department:'ECE',
        Year:"First Year",
        MockInterview: 88,
        SelfIntroduction: 92,
        GroupDiscussion: 78,
      },
    ];
    this.dataSource.data = data;
  }
  eventHeaders = ['Id' , 'Type', 'Date','For']
  eventDetails = [
    {
      "Id": "MI202401",
      "Type": "Mock Interview",
      "Date": new Date("2024-12-15"),
      "For": "Year 1"
    },
    {
      "Id": "SI202402",
      "Type": "Self Introduction",
      "Date": new Date("2024-12-18"),
      "For": "Year 2"
    },
    {
      "Id": "GD202403",
      "Type": "Group Discussion",
      "Date": new Date("2024-12-20"),
      "For": "Year 3"
    },
    {
      "Id": "MI202404",
      "Type": "Mock Interview",
      "Date": new Date("2024-12-25"),
      "For": "Year 4"
    },
    {
      "Id": "SI202405",
      "Type": "Self Introduction",
      "Date": new Date("2025-01-10"),
      "For": "Year 1"
    },
    {
      "Id": "GD202406",
      "Type": "Group Discussion",
      "Date": new Date("2025-01-15"),
      "For": "Year 2"
    }
  ]
}
