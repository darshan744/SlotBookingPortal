import {Component, ElementRef, inject,OnInit, ViewChild,} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UserService } from '../../../Services/StudentService/user.service';
import { CommonModule, DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { BaseChartDirective } from 'ng2-charts';
import { ChartOptions, ChartType } from 'chart.js';
import { MatButton } from '@angular/material/button';
import { DialogOpenService } from '../../../Services/DialogOpenService/dialog.service';
import { environment } from '../../../../environments/environment.development';
import { IFileUploadError, IFileUploadSuccess } from '../../../Models/Student.model';
import { HttpErrorResponse } from '@angular/common/http';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import { MatIconModule} from "@angular/material/icon";


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
interface ICanvasData {
  labels: any,
  datasets: [
    {
      data: any[],
      label: string,
      tension: number,
      fill: true,
    }
  ]
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatTableModule,MatFormFieldModule, MatInputModule,MatIconModule,
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
  eventResults: MatTableDataSource<eventResult> = new MatTableDataSource<eventResult>();
  eventResultGraphs : any;
  chartData : {[key : string] : ICanvasData}  = {};
  openDialog = inject(DialogOpenService);
  columns: string[] = ['No', 'eventName', 'date', 'marks', 'remarks'];

  get resumeLink(): string {
    return `${this._url}/${encodeURIComponent(this.user.ResumeLink)}`;
  }

  ngOnInit() {
    this._service.getHistory().subscribe((e: any) => {
      (e);
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
    this.eventResultGraphs = data.reduce(
      (result:any  , current :eventResult) => {
        (result[current['eventType']] = result[current['eventType']] || []).push(current);
        return result;
      },{})
    (this.eventResultGraphs);
    this.processChartData()
  }

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

  processChartData(): void {
    Object.keys(this.eventResultGraphs).forEach(eventType => {
      const eventData = this.eventResultGraphs[eventType];
      // Generate labels (Event Result IDs)
      const labels = eventData.map((event : any) => (this.convertDate(event.resultId).toLocaleDateString()));
      // Generate the data points for the chart (marks for each event)
      const data = eventData.map((event : any) => event.marks || 0); // If no marks, use 0
      // Store the chart data for the event
      this.chartData[eventType] = {
        // header : eventType,
        labels: labels,
        datasets: [
          {
            data: data,
            label: eventType, // Event type like "Mock Interview"
            tension: 0.32785,
            fill: true
          }
        ]
      };
    });
    (this.chartData)
  }

  fileInput(e: Event) {
    const target = e.target as HTMLInputElement;
    if (target && target.files) {
      const file: File = target.files[0];
      ('sending');
      this._service.fileUpload(file).subscribe({
        next: (e: IFileUploadSuccess | IFileUploadError) => {
          ('data');
          (e);
          if (e.success && 'fileName' in e) {
            this.selectedFileName = e.fileName;
            this.openDialog.openSnackBar(e.message);
            this.user.ResumeLink = e.fileName;
          } else {
            this.openDialog.openSnackBar(e.message);
          }
        },
        error: (err)=> {

        }
      });
    }

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
        (err.error);
        this.openDialog.openSnackBar(err.error.message);
      },
    });
  }

  convertDate(dateStr : string) {
    let splitDate = dateStr.split('_')[2].split('T')[0]
    let year = (splitDate.substring(0,4)) , month = splitDate.substring(4,6) , date = splitDate.substring(6);
    return new Date(parseInt(year) , parseInt(month) -1 , parseInt(date));
  }
}
