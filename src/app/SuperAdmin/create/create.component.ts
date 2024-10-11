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
import { SlotBreaks,data } from '../../Models/slot-breaks';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelect, MatOption, CommonModule, 
    FormsModule, MatIconModule,MatButtonModule, MatDatepickerModule,MatTabsModule,MatTableModule,
    MatAutocompleteModule, MatChipsModule,NgxMatTimepickerModule,MatCardModule
  ],
  providers:[provideNativeDateAdapter()],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class CreateComponent {
  /**Services */
  SlotGenerationServie = inject(SlotGenerateService);
  private _snackBar = inject(MatSnackBar);

  /**----------Variables-------------------- */
  enteredStaff = signal('');
  displaySelectedStaff = signal<string[]>([])
  slots : string[] = [];
  data : SlotBreaks = {
    morningBreak :'',
    eveningBreak : '',
    lunchStart : '',
    lunchEnd : '',
    range : 0
  }
  startDate : string = ''
  endDate : string = ''
  
  /*---------------Sample Data---------------*/
  staffs: any = ['Jhon Doe', 'Steve Smith', 'Virat kholi', 'John smith', 'Rhodeans Joe', 'Vin Diesel', 'Paul', 'Gates'
    , 'Subramani', 'Aaron', 'Rohith'
  ];
  statusDetails :data[] = [
    {
      staff_id: 'EC101',
      name: 'Gururs',
      status: 'Accepted',
      phone_number: '123-456-7890',
      email: 'gururs@example.com'
    },
    {
      staff_id: 'EC102',
      name: 'Mohana Priya',
      status: 'Pending',
      phone_number: '234-567-8901',
      email: 'mohanapriya@example.com'
    },
    {
      staff_id: 'EC103',
      name: 'Darshan',
      status: 'Accepted',
      phone_number: '345-678-9012',
      email: 'darshan@example.com'
    },
    {
      staff_id: 'EC104',
      name: 'Jhon Doe',
      status: 'Pending',
      phone_number: '456-789-0123',
      email: 'johndoe@example.com'
    },
    {
      staff_id: 'EC105',
      name: 'John Smith',
      status: 'Accepted',
      phone_number: '567-890-1234',
      email: 'johnsmith@example.com'
    },
    {
      staff_id: 'EC106',
      name: 'Steve Jobs',
      status: 'Pending',
      phone_number: '678-901-2345',
      email: 'stevejobs@example.com'
    },
    {
      staff_id: 'EC107',
      name: 'Subramani',
      status: 'Pending',
      phone_number: '789-012-3456',
      email: 'subramani@example.com'
    },
    {
      staff_id: 'EC108',
      name: 'TamilSelvan',
      status: 'Accepted',
      phone_number: '890-123-4567',
      email: 'tamilselvan@example.com'
    },
    {
      staff_id: 'EC109',
      name: 'Ramesh',
      status: 'Pending',
      phone_number: '901-234-5678',
      email: 'ramesh@example.com'
    },
    {
      staff_id: 'EC110',
      name: 'Jithu',
      status: 'Pending',
      phone_number: '012-345-6789',
      email: 'jithu@example.com'
    }
  ];
  columns : string[] = ['id','name','phoneNumber','email','status'];

  /*----------Methods----------*/
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
  tableClick(e:Event) {
    console.log(e.currentTarget);
    this._snackBar.open("opend","close");
  }
  onClick(staff: data) {
    console.log(staff);
  }
}
