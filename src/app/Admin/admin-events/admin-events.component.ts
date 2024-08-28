import { Component,inject } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { Action } from 'rxjs/internal/scheduler/Action';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

interface event{
  No:number,
  Name:string,
  Date:string,
  Time:string
}
@Component({
  selector: 'app-admin-events',
  standalone: true,
  imports: [MatTableModule,MatButtonModule],
  templateUrl: './admin-events.component.html',
  styleUrl: './admin-events.component.css'
})
export class AdminEventsComponent {

  private snackBar = inject(MatSnackBar)
  myEvetn:event[] = [
    {No:1,Name:'GroupDiscussion',Date:'24/JUN',Time:'09-10',},
    {No:2,Name:'GroupDiscussion',Date:'24/JUN',Time:'10-11',},
    {No:3,Name:'GroupDiscussion',Date:'24/JUN',Time:'11-12',},
    {No:4,Name:'MockInterview',Date:'25/JUN',Time:'2-3',},
    {No:5,Name:'SelfIntrodcution',Date:'26/JUN',Time:'2-3',},
    {No:6,Name:'SelfIntroduction',Date:'28/JUN',Time:'2-3',},
    {No:7,Name:'MockInterview',Date:'4/JUL',Time:'2-3',},
    {No:8,Name:'MockInterview',Date:'4/JUN',Time:'3-4',},
  ]
  columns = ['No','Name','Date','Time','Action'];

  cancelEvent(e:event){
    this.snackBar.open(`${e.Name} has been cancelled Will inform Students via email`);
    console.log('Event Cancelled Will Notify Students via mail',e)
  }
}
