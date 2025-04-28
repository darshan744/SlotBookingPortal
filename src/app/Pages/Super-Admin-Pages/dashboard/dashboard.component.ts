import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { SuperAdminService } from '../../../Services/SuperAdminServices/SlotGenerate/super-admin.service';
import { HttpErrorResponse } from '@angular/common/http';
import { IDashboard, IQuery } from '../SuperAdmin.interface';
import { ToastrService } from '../../../Services/Toastr/toastr.service';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ChartData, ChartOptions } from 'chart.js';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import {TagModule} from 'primeng/tag'
@Component({
  selector: 'app-dashboard',
  imports: [
    MatExpansionModule,TagModule,
    FormsModule,
    CommonModule,
    CardModule,
    ChartModule,
    InputTextModule,
    TableModule,
    DropdownModule,ButtonModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class Dashboard implements OnInit {
  method(arg0: any) {
    return arg0 ? arg0 : 'NA';
  }
  //for query form submition toast
  toastService = inject(ToastrService);
  //student's query details
  studentsQueries: IQuery[] = [];
  //query's status options
  queryStatusOptions = ['Pending', 'Resolved', 'Rejected'];

  //graph for each year;
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

  dataSource: any;
  ngOnInit(): void {
    this.getQueries();
    this.service.dashboard().subscribe({
      next: (res: IDashboard) => {
        this.studentTableHeader.push(...res.listOfEvents);
        this.events.push(...res.listOfEvents);
        this.studentData = res;
        this.eventDetails = res.events;
        const studentsData = this.setStudentData(res.students);
        this.dataSource = studentsData;
      },
      error: (err: HttpErrorResponse) => {},
    });

    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    const events = ['Id', 'Name', 'Year', 'Department'];

    this.events = events;
    // Simulated data
  }
  ngAfterViewInit() {}
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
  getQueries() {
    this.service
      .getQueries()
      .subscribe((res) => (this.studentsQueries = res.data));
  }
  postRemarks(
    remarks: string,
    status: 'Pending' | 'Resolved' | 'Rejected',
    queryId: string
  ) {
    if (status === 'Pending') {
      this.toastService.showToast('Please change status', 'error', 'Status');
      return;
    }
    if (remarks === '' || remarks === null) {
      this.toastService.showToast(
        'Remarks is not filled',
        'error',
        'Fields Not filled'
      );
      return;
    }
    this.service.postRemarksToQuery({ remarks, status, queryId });
  }
  eventHeaders = ['Id', 'Type', 'Date', 'For'];
  eventDetails = [] as any;
  studentFilter(e : Event) {
    let value = (e.target as HTMLInputElement).value;
    return value;
  }
}
