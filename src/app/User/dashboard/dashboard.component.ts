import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UserService } from '../../Services/StudentService/user.service';
import { CommonModule, DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { BaseChartDirective } from 'ng2-charts';
import { ChartOptions, ChartType } from 'chart.js';
import { MatButton } from '@angular/material/button';
import { DialogOpenService } from '../../Services/DialogOpenService/dialog.service';
import { environment } from '../../../environments/environment.development';
import { IFileUploadError, IFileUploadSuccess } from '../../Models/Student.model';
import { HttpErrorResponse } from '@angular/common/http';
export interface eventResult {
  eventType: string;
  date: string;
  marks: number;
  remarks: string;
}
interface IUserData {
  RollNo: string;
  Name: string;
  Dept: string;
  Year: string;
  ResumeLink: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatTableModule,
    DatePipe,
    MatCardModule,
    BaseChartDirective,
    CommonModule,
    MatButton,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css' , './dashboard-userInfo.component.css'],
})
export class DashboardComponent implements OnInit {
  @ViewChild('MockInterview')
  mockInterviewCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('SelfIntroduction')
  selfIntroduction!: ElementRef<HTMLCanvasElement>;
  @ViewChild('GroupDiscussion') groupDiscussion!: ElementRef<HTMLCanvasElement>;
  selectedFileName: string = '';
  user: IUserData = {} as IUserData;

  private _url: string = environment.BASE_URL;
  constructor(private _service: UserService) {}
  eventResults: MatTableDataSource<eventResult> =
    new MatTableDataSource<eventResult>();
  openDialog = inject(DialogOpenService);
  columns: string[] = ['No', 'eventName', 'date', 'marks', 'remarks'];
  detais: any;

  get resumeLink(): string {
    return `${this._url}/${encodeURIComponent(this.user.ResumeLink)}`;
  }
  ngOnInit() {
    this._service.getHistory().subscribe((e: any) => {
      // console.log(e);
      this.eventResults = new MatTableDataSource(e.data.EventHistory);
      this.assignDate();
    });
    let ses = sessionStorage.getItem('loggedInUser');
    if (ses) {
      let temp = JSON.parse(ses);
      this.user = {
        RollNo: temp.id,
        Name: temp.name,
        Dept: temp.department,
        Year: temp.year,
        ResumeLink: temp.resume,
      };
      this.selectedFileName = temp.resume;
    }
  }
  assignDate() {
    let data = this.eventResults.data;
    if (data.length > 0) {
      for (const res of data) {
        if (res.eventType === 'Mock Interview') {
          this.Mock_Interview.labels.push(
            new Date(res.date).toLocaleDateString()
          );
          // console.log("marks"+res.marks);
          this.Mock_Interview.datasets[0].data.push(res.marks);
        }
        if (res.eventType === 'Self Introduction') {
          this.Self_Introduction.labels.push(
            new Date(res.date).toLocaleDateString()
          );
          this.Self_Introduction.datasets[0].data.push(res.marks);
        }
        if (res.eventType === 'Group Discussion') {
          this.Group_Discussion.labels.push(
            new Date(res.date).toLocaleDateString()
          );
          this.Group_Discussion.datasets[0].data.push(res.marks);
        }
      }
    }
  }
  upcomingevents = [{ name: 'GroupDiscussion', date: '24/JUN' }];
  Mock_Interview = {
    labels: [] as any,
    datasets: [
      {
        data: [] as any,
        label: 'Mock Interview',
        tension: 0.323324,
        fill: true,
      },
    ],
  };
  Self_Introduction = {
    labels: [] as any,
    datasets: [
      {
        data: [] as any,
        label: 'Self Introduction',
        tension: 0.323324,
        fill: true,
      },
    ],
  };
  Group_Discussion = {
    labels: [] as any,
    datasets: [
      {
        data: [] as any,
        label: 'Group Discussion',
        tension: 0.323324,
        fill: true,
      },
    ],
  };
  type: ChartType = 'line';
  options: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          font: { size: 12 },
        },
      },
      y: {
        min: 0,
        max: 20,
      },
    },
  };
  fileInput(e: Event) {
    const target = e.target as HTMLInputElement;
    if (target && target.files) {
      const file: File = target.files[0];
      console.log('sending');
      this._service.fileUpload(file).subscribe({
        next: (e: IFileUploadSuccess | IFileUploadError) => {
          console.log('data');
          console.log(e);
          if (e.success && 'fileName' in e) {
            this.selectedFileName = e.fileName;
            this.openDialog.openSnackBar(e.message);
            this.user.ResumeLink = e.fileName;
          } else {
            this.openDialog.openSnackBar(e.message);
          }
        },
        error: (err)=> {
          //handling the error
          console.log(err);
        }
      });
    }
    // this.selectedFileName = e.target.files[0].name;
    // console.log(e.target.files[0]);
  }
  clearFile() {
    const fileName = this.user.ResumeLink;
    const res$ = this._service.fileDelete(fileName);
    res$.subscribe({
      next: () => {
        this.selectedFileName = '';
        this.user.ResumeLink = '';
        this.openDialog.openSnackBar('successfully deleted');
      },
      error: (err : HttpErrorResponse) => {
        console.log(err.error);
        this.openDialog.openSnackBar(err.error.message);
      },
    });
  }
}
