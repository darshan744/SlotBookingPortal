import { AfterViewInit, Component, ElementRef, input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ChartOptions, ChartType, } from 'chart.js';
import {BaseChartDirective } from 'ng2-charts';
import { eventResult } from '../dashboard.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-graphs',
  standalone: true,
  imports: [
    BaseChartDirective,MatCardModule,CommonModule
  ],
  templateUrl: './graphs.component.html',
  styleUrl: './graphs.component.css'
})

export class GraphsComponent implements OnChanges ,AfterViewInit{

  eventResult = input<eventResult[]>([]);
  ctx !: CanvasRenderingContext2D;
  gradient : {[key:string] : CanvasGradient}={};

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    let data = changes['eventResult'].currentValue;

    if(data.length > 0) {
      for(const res of data) {
        if(res.eventType === 'Mock Interview'){
          this.Mock_Interview.labels.push(res.date);
          this.Mock_Interview.datasets[0].data.push(res.marks);
        }
        if(res.eventType === 'Self Introduction') {
          this.Self_Introduction.labels.push(res.date);
          this.Self_Introduction.datasets[0].data.push(res.marks);
        }
        if(res.eventType === 'Group Discussion') {
          this.Group_Discussion.labels.push(res.date);
          this.Group_Discussion.datasets[0].data.push(res.marks);
        }
      }
      console.log(this.Mock_Interview.labels);
      console.log(this.Group_Discussion);
    }
  }

  @ViewChild('MockInterview') mockInterviewCanvas!:ElementRef<HTMLCanvasElement>
  @ViewChild('SelfIntroduction') selfIntroduction!:ElementRef<HTMLCanvasElement>
  @ViewChild('GroupDiscussion') groupDiscussion !: ElementRef<HTMLCanvasElement>

  ngAfterViewInit(): void {
    let data = this.eventResult()
    console.log(data + "Data");
    if(data && data.length > 0 ) {
      for(const res of data) {
        if(res.eventType === 'Mock Interview'){
          this.Mock_Interview.labels.push(res.date);
          this.Mock_Interview.datasets[0].data.push(res.marks);
        }
        if(res.eventType === 'Self Introduction') {
          this.Self_Introduction.labels.push(res.date);
          this.Self_Introduction.datasets[0].data.push(res.marks);
        }
        if(res.eventType === 'Group Discussion') {
          this.Group_Discussion.labels.push(res.date);
          this.Group_Discussion.datasets[0].data.push(res.marks);
        }
      }
      console.log(this.Mock_Interview.labels);
      console.log(this.Group_Discussion);
    }
    this.gradientReturn();
  }

  gradientReturn(){
    this.ctx = this.mockInterviewCanvas.nativeElement.getContext('2d')!;
    if(this.ctx){
      this.gradient['MockInterview'] = this.ctx.createLinearGradient(0,8,7,400);
      this.gradient['MockInterview'].addColorStop(0,'rgb(29,122,243)');
      this.gradient['MockInterview'].addColorStop(1,'rgba(255,255,255,0)');
      console.log('Gradient',this.gradient['MockInterview']);
    }
  }
  Mock_Interview = {
    labels:[''],
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
    labels:[ '2024-08-01' ],
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
        fill:true,
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
