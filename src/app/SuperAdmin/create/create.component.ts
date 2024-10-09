import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component,  inject,  signal  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule} from '@angular/material/form-field';
import {  MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete'
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { provideNativeDateAdapter } from '@angular/material/core';
import { SlotGenerateService } from '../../Services/SlotGenerate/slot-generate.service';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { MatCardModule } from '@angular/material/card';
import { SlotBreaks } from '../../Models/slot-breaks';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-create',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelect, MatOption, CommonModule, 
    FormsModule, MatIconModule,MatButtonModule, MatDatepickerModule, 
    MatAutocompleteModule, MatChipsModule,NgxMatTimepickerModule,MatCardModule
  ],
  providers:[provideNativeDateAdapter()],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class CreateComponent {

  SlotGenerationServie = inject(SlotGenerateService);
  private _snackBar = inject(MatSnackBar);

  enteredStaff = signal('');
  displaySelectedStaff = signal<string[]>([])
  
  
  data : SlotBreaks = {
    morningBreak :'',
    eveningBreak : '',
    lunchStart : '',
    lunchEnd : '',
    range : 0
  }
  startDate : string = ''
  endDate : string = ''
  
  staffs: any = ['Jhon Doe', 'Steve Smith', 'Virat kholi', 'John smith', 'Rhodeans Joe', 'Vin Diesel', 'Paul', 'Gates'
    , 'Subramani', 'Aaron', 'Rohith'
  ];
  add(e: MatChipInputEvent) {
    var value = e.value.trim();
    this.enteredStaff.set('');
    if (value) {
      this.displaySelectedStaff.update((staffs) => {
        if (this.displaySelectedStaff().includes(value)) {
          return [...staffs]
        }
        else {
          return [...staffs, value]
        }
      });
    }
  }
  optionSelect(e: MatAutocompleteSelectedEvent) {
    var value = e.option.viewValue;
    this.enteredStaff.set('');
    this.displaySelectedStaff.update((staffs) => {
      if (this.displaySelectedStaff().includes(value)) {
        e.option.deselect();
        return [...staffs]
      }
      else {
        e.option.deselect();
        return [...staffs, value]
      }
    }
    )
  }
  submit() {
    if(this.slots.length === 0 || this.displaySelectedStaff().length === 0 
              || this.startDate === '' || this.endDate === '')
          {
            alert('enter Data'); 
          }
    let staffs = this.displaySelectedStaff();
    console.log(this.slots);
    
    this.SlotGenerationServie.openDialog(staffs,this.slots,this.startDate , this.endDate)
    // this.SlotGenerationServie.openDialog("hi");
    console.log("Hello");
  }
  removeStaff(inputstaff: string) {
    this.displaySelectedStaff.update( staff => {
      const index = staff.indexOf(inputstaff);
      if(index < 0) {
        return staff;
      }
      staff.splice(index,1);
      return [...staff]
    })
  }
  slots : string[] = []
  generateSlot() {
    if(this.data.morningBreak === '' || this.data.eveningBreak === '' 
      || this.data.lunchStart === '' || this.data.lunchEnd === '' || this.data.range === 0) {
        alert('enter data')       
      }
      else 
      {
        console.log("generated Timings are : " +this.data.morningBreak+" ," + this.data.eveningBreak +" ," +  this.data.lunchEnd +" ," +  this.data.lunchStart +" ," +  this.data.lunchStart  +" ," + this.data.range);
        this.slots = this.SlotGenerationServie.generate(this.data);
        this._snackBar.open("Generated Successfully", "Done");
        console.log(this.slots);
      }

  }
}
