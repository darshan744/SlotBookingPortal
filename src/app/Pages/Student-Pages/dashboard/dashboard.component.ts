import {
  Component,
  ElementRef,
  inject,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UserService } from '../../../Services/StudentService/user.service';
import { CommonModule, DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { BaseChartDirective } from 'ng2-charts';
import { ChartOptions, ChartType } from 'chart.js';
import { DialogOpenService } from '../../../Services/DialogOpenService/dialog.service';
import { environment } from '../../../../environments/environment.development';
import {
  IFileUploadError,
  IFileUploadSuccess,
} from '../../../Models/Student.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from '../../../Services/Toastr/toastr.service';
import { IQuery } from '../../Super-Admin-Pages/SuperAdmin.interface';

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
  labels: any;
  datasets: [
    {
      data: any[];
      label: string;
      tension: number;
      fill: true;
    }
  ];
}

@Component({
  selector: 'app-dashboard',
  imports: [
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    DatePipe,
    ReactiveFormsModule,
    MatCardModule,
    BaseChartDirective,
    CommonModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css', './QueryDialog.css'],
})
export class DashboardComponent implements OnInit {
  //Query Dialog
  @ViewChild('queryDialog') queryDialog!: TemplateRef<any>;

  //query storing property
  studentsQueries: IQuery[] = [];

  //used when uploading file
  selectedFileName: string = '';
  //used for rendering user info
  user: IUserData = {} as IUserData;
  //used for linking file -> resume url
  private _url: string = environment.BASE_URL;
  constructor(private _service: UserService) {}
  //used for rendering event history
  eventResults: MatTableDataSource<eventResult> =
    new MatTableDataSource<eventResult>();
  //graph data
  eventResultGraphs: any;

  chartData: { [key: string]: ICanvasData } = {};
  //dialog opening service
  //openDialog = inject(DialogOpenService);
  toastService = inject(ToastrService);
  matDialog = inject(MatDialog);
  //table headers
  columns: string[] = ['No', 'eventName', 'date', 'marks', 'remarks'];
  //constructing url for the file
  get resumeLink(): string {
    return `${this._url}/${encodeURIComponent(this.user.ResumeLink)}`;
  }

  ngOnInit(): void {
    //student's queries
    this.getQueries();
    //student's attended events
    this.getEventHistory();
    //student's data from session storage
    this.getStudentDatafromSession();
  }

  //getting student's event history
  getEventHistory() {
    this._service.getHistory().subscribe((e: any) => {
      console.log(e);
      this.eventResults = new MatTableDataSource(e.data.EventHistory);
      this.assignDate();
    });
  }
  //get Student's data from session storage
  getStudentDatafromSession(): void {
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
  //reducing the event history by grouping the event types
  assignDate(): void {
    let data = this.eventResults.data;
    console.log(data);
    this.eventResultGraphs = data.reduce(
      (result: any, current: eventResult) => {
        (result[current['eventType']] =
          result[current['eventType']] || []).push(current);
        return result;
      },
      {}
    );
    console.log(this.eventResultGraphs);
    this.processChartData();
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
    //Object.keys() returns string[] of the keys(properties) of the object
    Object.keys(this.eventResultGraphs).forEach((eventType) => {
      // the keys are of the type of the event EX : Mock inteview , GD etc...
      const eventData = this.eventResultGraphs[eventType];
      // Generate labels (Event Result IDs)
      const labels = eventData.map((event: any) =>
        this.convertDate(event.resultId).toLocaleDateString()
      );
      // Generate the data points for the chart (marks for each event)
      const data = eventData.map((event: any) => event.marks || 0); // If no marks, use 0
      // Store the chart data for the event
      this.chartData[eventType] = {
        // header : eventType,
        labels: labels,
        datasets: [
          {
            data: data,
            label: eventType, // Event type like "Mock Interview"
            tension: 0.32785,
            fill: true,
          },
        ],
      };
    });
    this.chartData;
  }

  fileInput(e: Event): void {
    const target = e.target as HTMLInputElement;
    if (target && target.files) {
      const file: File = target.files[0];
      ('sending');
      this._service.fileUpload(file).subscribe({
        next: (e: IFileUploadSuccess | IFileUploadError) => {
          ('data');
          e;
          if (e.success && 'fileName' in e) {
            this.selectedFileName = e.fileName;
            this.toastService.showToast(e.message, false);
            this.user.ResumeLink = e.fileName;
          } else {
            this.toastService.showToast(e.message, false);
          }
        },
        error: (err) => {},
      });
    }
  }

  //deletes the resume of the student
  clearFile(): void {
    const fileName = this.user.ResumeLink;
    const res$ = this._service.fileDelete(fileName);
    const subscription = res$.subscribe({
      next: () => {
        this.selectedFileName = '';
        this.user.ResumeLink = '';
      },
      error: (err: HttpErrorResponse) => {
        err.error;
        this.toastService.showToast('Could not Delete file', true);
      },
    });
    subscription.unsubscribe();
  }

  //converts the data from the id string
  //parses it and genreate a date object
  convertDate(dateStr: string): Date {
    //splitting the Event Id to get the data in string
    //EX : 7376221EC135_Mock Interview_20210915T000000
    let splitDate = dateStr.split('_')[2].split('T')[0];
    //splitting the date string to get corressponding year , month date
    let year = splitDate.substring(0, 4),
      month = splitDate.substring(4, 6),
      date = splitDate.substring(6);
    //parses the string to number and then create a date object
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(date));
  }
  //change password
  //TODO: Implement change password
  changePassword() {
    this.query;
  }
  // opens a dialog for raising a query
  openQueryDialog() {
    this.matDialog.open(this.queryDialog, {
      width: '500px',
      height: '400px',
    });
  }
  //raise query method
  query = new FormGroup({
    title: new FormControl<string | null>(null, Validators.required),
    description: new FormControl<string | null>(null, Validators.required),
  });
  raiseQuery() {
    if (this.query.invalid) {
      this.toastService.showToast('Please fill all the fields', false, 'info');
    }
    else {
      const {title , description} = this.query.value;
      if(!title || !description) {
        this.toastService.showToast('Please fill all the fields', false, 'info');
        return;
      }
      this._service.postStudentQuery({ title, description });
      this.getQueries();
    }
  }
  getQueries() {
    this._service.getStudentQueries().subscribe((res) => {
      this.studentsQueries = res.data;
    });
  }
}
