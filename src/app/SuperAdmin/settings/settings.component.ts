import { CommonModule } from '@angular/common';
import {Component, inject, OnInit, TemplateRef, ViewChild} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {  MatChipsModule } from '@angular/material/chips';
import {FormGroup, FormControl, ReactiveFormsModule, Validators, FormsModule} from '@angular/forms';
import { DialogOpenService } from '../../Services/DialogOpenService/dialog.service';
import { SuperAdminService } from '../../Services/SuperAdminServices/SlotGenerate/super-admin.service';
import { NgxMatTimepickerComponent,  NgxMatTimepickerDirective, NgxMatTimepickerToggleComponent } from "ngx-mat-timepicker";
import {provideNativeDateAdapter} from "@angular/material/core";
import {IBreaks} from "../SuperAdmin.interface";
import {HttpErrorResponse} from "@angular/common/http";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";


@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [MatIconModule, MatFormFieldModule, MatInputModule, MatDivider, MatButtonModule, CommonModule, MatChipsModule,
    ReactiveFormsModule, NgxMatTimepickerComponent, NgxMatTimepickerToggleComponent, NgxMatTimepickerDirective, FormsModule,
    MatDialogModule
  ],
  providers:[provideNativeDateAdapter()],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent implements OnInit{

  @ViewChild('breakTemplate') breakTemplate!: TemplateRef<any>;
  matDialog : MatDialog = inject(MatDialog);

  dialogService : DialogOpenService = inject(DialogOpenService)
  service : SuperAdminService = inject(SuperAdminService);
  displayPassword = false;
  displayNewPassword = false;
  currentPassword = 'Darshan'
  currentEmail = 'darshank.ec22@bitsathy.ac.in'
  userName = 'Darshan';
  items : string[] = []

  retrievedBreaks : IBreaks[] = [] as any;
  breaks : FormGroup = new FormGroup({
    configurationId : new FormControl<string | null>(null , Validators.required),
    morningBreak : new FormControl<string | null>(null , Validators.required),
    eveningBreak : new FormControl<string | null>(null , Validators.required),
    lunchStart : new FormControl<string | null>(null , Validators.required),
    lunchEnd : new FormControl<string | null>(null , Validators.required),
  })
  onConfigSubmit() {
    if(this.breaks.valid) {
      const body = {configurationId : this.breaks.get('configurationId')?.value,
        breaks : {
          morningBreak : this.breaks.get('morningBreak')?.value,
          eveningBreak : this.breaks.get('eveningBreak')?.value,
          lunchStart : this.breaks.get('lunchStart')?.value,
          lunchEnd : this.breaks.get('lunchEnd')?.value,
        }
      }
      this.service.postBreaks(body);
    }
    else {
      console.log('invalid');
    }
  }
  eventData = new FormGroup(
    {
      Name : new FormControl<string>('',Validators.required),
      Description : new FormControl<string>('',Validators.required),
      MaximumParticipant : new FormControl<number>(0 , Validators.required)
    }
  )
  ngOnInit() {
    this.getEvents();
    this.service.getBreaks().subscribe({
      next : result => {
        this.retrievedBreaks = result.data
      },
      error : (e : HttpErrorResponse) => {
        this.dialogService.openSnackBar(e.message);
      }
    })
    const session = sessionStorage.getItem('loggedInUser');
    if(session) {
      const parsed : any = JSON.parse(session);
      this.currentEmail = parsed.email;
      this.userName = parsed.name;
    }
  }
  createEvent() {
    const Name  = this.eventData.get('Name')?.value;
    const Description = this.eventData.get('Description')?.value;
    const MaximumParticipant = this.eventData.get('MaximumParticipant')?.value;
    if(Name  && Description && MaximumParticipant && MaximumParticipant > 0) {
      this.service.createEvents({Name : Name , Description : Description , MaximumParticipant : MaximumParticipant})
      .subscribe((e : {message : string , success:boolean})=>{
        this.dialogService.openSnackBar(e.message);
        this.eventData.get('Name')?.reset()
        this.eventData.get('Description')?.reset()
        this.eventData.get('MaximumParticipant')?.reset()
        this.getEvents();
      })
    }
    else {
      this.dialogService.openSnackBar('Please Enter Values');
      return;
    }
  }
  getEvents() {
    this.service.getEvents().subscribe({
      next: (e : {message : string , data ?: {Name:string}[]})=>{
        if(e.data) {
          this.items = e.data.map(el=>el.Name);
          console.log(e.data);
        }
        else {
          this.dialogService.openSnackBar('No Events Available');
        }
      },
      error : (err : HttpErrorResponse) =>{
        this.dialogService.openSnackBar(err.message);
    }
    }
    )
  }

  getBreaksById (configurationID : string) {
    this.service.getBreaksById(configurationID).subscribe({
      next:(data) => {
        this.matDialog.open(this.breakTemplate , {data: data.data , width: '600px'});
      }
    })
  }
}
