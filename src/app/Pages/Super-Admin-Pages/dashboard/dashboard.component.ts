import { CommonModule, DatePipe , KeyValuePipe} from '@angular/common';
import {Component, OnInit ,ViewChild,inject} from '@angular/core';
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
import {IDashboard, ISlot, IStudent} from "../SuperAdmin.interface";

@Component({
    selector: 'app-dashboard',
    imports: [
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        BaseChartDirective,
        MatPaginator,
        MatExpansionModule,
        FormsModule,
        MatButtonModule,
        MatIconModule,
        CommonModule,
        MatTableModule,
    ],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css'
})
export class Dashboard implements OnInit {
  @ViewChild('paginator') paginator: MatPaginator | null = null;
  array = ['first year', 'Second Year', 'Third Year', 'Fourth Year'];
  eventTypes: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
  ];
  studentTableHeader: string[] = ['Id', 'Name', 'Year', 'Department'];
  eventsHeaderArray: string[] = [];
  chartData: ChartData<'line'> = {
    labels: this.eventTypes,
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
      },
    ],
  };
  chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: (c) => `${c.dataset.label} : ${c.raw}`,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          font: { size: 12 },
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };
  service: SuperAdminService = inject(SuperAdminService);
  events: string[] = [];
  studentData: IDashboard | null = null;

  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  ngOnInit(): void {
    this.service.dashboard().subscribe({
      next: (res: IDashboard) => {
        this.studentTableHeader.push(...res.listOfEvents);
        this.events.push(...res.listOfEvents);
        this.studentData = res;
        this.eventDetails = res.events;
        const studentsData = this.setStudentData(res.students);
        this.dataSource = new MatTableDataSource(studentsData);
        this.dataSource.paginator = this.paginator;
      },
      error: (err: HttpErrorResponse) => {},
    });

    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
     const events = [
       'Id',
       'Name',
       'Year',
       'Department',
     ];

     this.events = events;
     // Simulated data
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  setStudentData(studentData: IDashboard['students']) {
    const data = studentData.map((student) => {
      let datum: any = {
        Id: student.id,
        Name: student.name,
        Year: student.year,
        Department: student.department,
      };
      student.eventHistory.forEach((event) => {
        const key = event.key;
        console.log(key);
        datum[key] = event.avg;
      });
      return datum;
    });
    return data;
  }
  eventHeaders = ['Id', 'Type', 'Date', 'For'];
  eventDetails = [] as any;
}
const d = [
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
