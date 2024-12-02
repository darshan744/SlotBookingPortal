import { Component ,ElementRef,OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UserService } from '../../Services/StudentService/user.service';
import { CommonModule, DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { BaseChartDirective } from 'ng2-charts';
import { ChartOptions, ChartType, } from 'chart.js';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
export interface eventResult{
  eventType:string,
  date:string,
  marks:number,
  remarks:string
}


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatTableModule,DatePipe,MatCardModule,BaseChartDirective,CommonModule,MatButton
],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
fileUrl: string = 'D:\abstractsABSTRACT.pdf';
clearFile() {

}

  @ViewChild('MockInterview') mockInterviewCanvas!:ElementRef<HTMLCanvasElement>
  @ViewChild('SelfIntroduction') selfIntroduction!:ElementRef<HTMLCanvasElement>
  @ViewChild('GroupDiscussion') groupDiscussion !: ElementRef<HTMLCanvasElement>
  selectedFileName: string = '';
  user: any ;

  constructor(private _service : UserService) {}
  eventResults : MatTableDataSource<eventResult> = new MatTableDataSource<eventResult>();

  columns:string[] = ['No','eventName','date','marks','remarks']
  detais:any;
  ngOnInit(){
    this._service.getHistory().subscribe((e : any)=>{
      // console.log(e);
    this.eventResults = new MatTableDataSource(e.data.EventHistory);
    this.assignDate();
  });
    let ses = sessionStorage.getItem('loggedInUser')
    if(ses){
      let temp =  JSON.parse(ses);
      this.user = {
        RollNo : temp.studentId,
        Name : temp.name,
        Dept : temp.department,
        Year : temp.year
      }
    }
  }
  ngAfterViewInit() {
    // console.log(this.Mock_Interview);
  }
  assignDate() {
    let data = this.eventResults.data;
    if(data.length > 0) {
      for(const res of data) {
        if(res.eventType === 'Mock Interview'){
          this.Mock_Interview.labels.push(new Date(res.date).toLocaleDateString());
          // console.log("marks"+res.marks);
          this.Mock_Interview.datasets[0].data.push(res.marks);
        }
        if(res.eventType === 'Self Introduction') {
          this.Self_Introduction.labels.push(new Date(res.date).toLocaleDateString());
          this.Self_Introduction.datasets[0].data.push(res.marks);
        }
        if(res.eventType === 'Group Discussion') {
          this.Group_Discussion.labels.push(new Date(res.date).toLocaleDateString());
          this.Group_Discussion.datasets[0].data.push(res.marks);
        }
      }
    }
  }
  upcomingevents=[
    {name:'GroupDiscussion',date:'24/JUN'},
  ]
  Mock_Interview = {
    labels:[] as any,
    datasets:[
      {
        data:[] as any,
        label:'Mock Interview',
        tension:0.323324,
        fill:true,
      }
    ]
  }
  Self_Introduction = {
    labels:[] as any,
    datasets:[
      {
        data:[] as any,
        label:'Self Introduction',
        tension:0.323324,
        fill:true
      }
    ]

  }
  Group_Discussion = {
    labels:[] as any,
    datasets:[
      {
        data:[] as any,
        label:'Group Discussion',
        tension:0.323324,
        fill:true,
      },

    ]
  }
  type:ChartType = 'line';
  options:ChartOptions =  {
    responsive:true,
    maintainAspectRatio:false,
    scales:{
      x: {
        ticks:{
        font:{size:12}
        }
      },
      y:{
        min:0,
        max:20
      }
    }
  }
  onDragOver(event: DragEvent) {
    event.preventDefault(); // Prevent default behavior (browser handling)
    // Optionally, add visual indication for valid drag target (e.g., change border color)
  }

  // Handle file drop event
  onDrop(event: DragEvent) {
    console.log(event);
    event.preventDefault(); // Prevent default handling (e.g., opening the file)
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      const file = files[0]; // Get the first file dropped
      this.selectedFileName = file.name; // Store the file name
    }
  }
  fileInput(e:any) {
    this.selectedFileName = e.target.files[0].name;
    console.log(e.target.files[0]);
  }
}
