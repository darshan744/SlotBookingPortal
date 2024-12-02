import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {  MatChipsModule } from '@angular/material/chips';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogOpenService } from '../../Services/DialogOpenService/dialog.service';
import { SuperAdminService } from '../../Services/SuperAdminServices/SlotGenerate/super-admin.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [MatIconModule,MatFormFieldModule,MatInputModule,MatDivider,
    MatButtonModule,CommonModule,MatChipsModule,ReactiveFormsModule
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {

  dialogService : DialogOpenService = inject(DialogOpenService)
  service : SuperAdminService = inject(SuperAdminService);
  displayPassword = false;
  displayNewPassword = false;
  currentPassword = 'Darshan'
  currentEmail = 'darshank.ec22@bitsathy.ac.in'
  userName = 'Darshan';
  items : string[] = []


  eventData = new FormGroup(
    {
      Name : new FormControl<string>('',Validators.required),
      Description : new FormControl<string>('',Validators.required),
      MaximumParticipant : new FormControl<number>(0 , Validators.required)
    }
  )
  ngOnInit() {
    this.getEvents();
  }
  createEvent() {
    const Name  = this.eventData.get('Name')?.value;
    const Description = this.eventData.get('Description')?.value;
    const MaximumParticipant = this.eventData.get('MaximumParticipant')?.value;
    if(Name  && Description && MaximumParticipant && MaximumParticipant > 0) {
      console.log(Name);
      console.log(Description);
      console.log(MaximumParticipant);
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
    this.service.getEvents().subscribe(
      (e : {message : string , data ?: {Name:string}[]})=>{
        if(e.data) {
          this.items = e.data.map(el=>el.Name);
          console.log(e.data);
        }
        else {
          this.dialogService.openSnackBar('No Events Availabile');
        }
      }
    )
  }
}
