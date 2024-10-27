import { Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {  MatChipsModule } from '@angular/material/chips';
import { MatDivider } from '@angular/material/divider';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { SlotBreaks } from '../../Models/slot-breaks';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SlotGenerateService } from '../../Services/SuperAdminServices/SlotGenerate/slot-generate.service';
interface Venues {
  venue : string,
  staffs : string[]
}
@Component({
  selector: 'app-slot-generation',
  standalone: true,
  imports: [CommonModule,FormsModule,MatChipsModule,MatDivider,NgxMatTimepickerModule,
    MatFormFieldModule,MatSelectModule,MatInput,MatButtonModule],
  templateUrl: './slot-generation.component.html',
  styleUrl: './slot-generation.component.css'
})
export class SlotGenerationComponent {

  constructor(private SlotGenerationServie :SlotGenerateService ) {
    
  }
  selectedEvent = '';
  selectedYear = '';
  venueInput:string = ''; staffInput:string = '';
  venues = signal<Venues[]>([]);
  staff :string='';
  data: SlotBreaks = {
    morningBreak: '',
    eveningBreak: '',
    lunchStart: '',
    lunchEnd: '',
    range: 0
  }
  private _snackBar = inject(MatSnackBar);
  slots = signal<string[]>([]);
  generateSlot() {
    if (this.data.morningBreak === '' || this.data.eveningBreak === ''
      || this.data.lunchStart === '' || this.data.lunchEnd === '' || this.data.range === 0) {
      alert('enter data')
    }
    else {
      // console.log("generated Timings are : " + this.data.morningBreak + " ," + this.data.eveningBreak + " ," + this.data.lunchEnd + " ," + this.data.lunchStart + " ," + this.data.lunchStart + " ," + this.data.range);
      // this.slots.set(this.SlotGenerationServie.generate(this.data));
      this._snackBar.open("Generated Successfully", "Done");
      console.log(this.slots);
    }

  }
  addStaff() {
    if(this.venueInput !== '' && this.staffInput !== '') {
      this.venues.update((value) => {
        const updatedVenues = value.map(venue => {
            // Check if the venue matches the input
            if (venue.venue === this.venueInput) {
                // If it exists, check if the staff already exists
                if (!venue.staffs.includes(this.staffInput)) {
                    // Add the staff to the existing venue
                    return {
                        ...venue,
                        staffs: [...venue.staffs, this.staffInput] // Create a new array for staffs
                    };
                }
            }
            return venue; // Return the original venue if no changes
        });

        // If venue does not exist, add it as a new entry
        if (!updatedVenues.some(v => v.venue === this.venueInput)) {
            updatedVenues.push({ venue: this.venueInput, staffs: [this.staffInput] });
        }

        return updatedVenues; // Return the updated array
    });
      console.log(this.venues())
      
    }
  }
}
