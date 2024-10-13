import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete'
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { provideNativeDateAdapter } from '@angular/material/core';
import { SlotGenerateService } from '../../Services/SuperAdminServices/SlotGenerate/slot-generate.service';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { MatCardModule } from '@angular/material/card';
import { SlotBreaks, data, staffs } from '../../Models/slot-breaks';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { DialogOpenService } from '../../Services/DialogOpenService/dialog.service';
import { SlotGenerationComponent } from "../slot-generation/slot-generation.component";

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelect, MatOption, CommonModule,
    FormsModule, MatIconModule, MatButtonModule, MatDatepickerModule, MatTabsModule, MatTableModule,
    MatAutocompleteModule, MatChipsModule, NgxMatTimepickerModule, MatCardModule, SlotGenerationComponent],
  providers: [provideNativeDateAdapter()],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateComponent {


  dateFilter = (date : Date):boolean=> {
    if(!date)return false;
    var day = (date || new Date()).getDay();
    var today = new Date();
    today.setHours(0,0,0,0);
    return day !== 0 && date >= today;
  } 

  ngOnInit():void {
    this.SlotGenerationServie.getAllStaff().subscribe(staffs =>{
    this.staffs = staffs.staffs
    });
    console.log(this.staffs);
  }
  /**Services */
  SlotGenerationServie = inject(SlotGenerateService);
  private _snackBar = inject(MatSnackBar);
  private _dialogService = inject(DialogOpenService);
  /**----------Variables-------------------- */
  enteredStaff = signal('');
  displaySelectedStaff = signal<staffs["staffs"]>([])
  slots = signal<string[]>([]);
  data: SlotBreaks = {
    morningBreak: '',
    eveningBreak: '',
    lunchStart: '',
    lunchEnd: '',
    range: 0
  }
  startDate: string = ''
  endDate: string = ''

  staffs:staffs["staffs"] = [];
  /*---------------Sample Data---------------*/
  //both are to be retreived from backend
  // staffs: string[] = ['Jhon Doe', 'Steve Smith', 'Virat kholi', 'John smith',
  //   'Rhodeans Joe', 'Vin Diesel', 'Paul', 'Gates', 'Subramani', 'Aaron', 'Rohith'];
  statusDetails: data[] = [
    {
      staff_id: 'EC101',
      name: 'Gururs',
      status: 'Accepted',
      phone_number: '123-456-7890',
      email: 'gururs@example.com',
      slots: this.slots
    },
    {
      staff_id: 'EC102',
      name: 'Mohana Priya',
      status: 'Pending',
      phone_number: '234-567-8901',
      email: 'mohanapriya@example.com',
      slots: this.slots
    },
    {
      staff_id: 'EC103',
      name: 'Darshan',
      status: 'Accepted',
      phone_number: '345-678-9012',
      email: 'darshan@example.com',
      slots: this.slots
    },
    {
      staff_id: 'EC104',
      name: 'Jhon Doe',
      status: 'Pending',
      phone_number: '456-789-0123',
      email: 'johndoe@example.com',
      slots: this.slots
    },
    {
      staff_id: 'EC105',
      name: 'John Smith',
      status: 'Accepted',
      phone_number: '567-890-1234',
      email: 'johnsmith@example.com',
      slots: this.slots
    },
    {
      staff_id: 'EC106',
      name: 'Steve Jobs',
      status: 'Pending',
      phone_number: '678-901-2345',
      email: 'stevejobs@example.com',
      slots: this.slots
    },
    {
      staff_id: 'EC107',
      name: 'Subramani',
      status: 'Pending',
      phone_number: '789-012-3456',
      email: 'subramani@example.com',
      slots: this.slots
    },
    {
      staff_id: 'EC108',
      name: 'TamilSelvan',
      status: 'Accepted',
      phone_number: '890-123-4567',
      email: 'tamilselvan@example.com',
      slots: this.slots
    },
    {
      staff_id: 'EC109',
      name: 'Ramesh',
      status: 'Pending',
      phone_number: '901-234-5678',
      email: 'ramesh@example.com',
      slots: this.slots
    },
    {
      staff_id: 'EC110',
      name: 'Jithu',
      status: 'Pending',
      phone_number: '012-345-6789',
      email: 'jithu@example.com',
      slots: this.slots
    }
  ];

  columns: string[] = ['id', 'name', 'phoneNumber', 'email', 'status'];

  /*----------Methods----------*/
  add(e: MatChipInputEvent) {
    var value = e.value.trim();
    this.enteredStaff.set('');
    if (value) {
      this.displaySelectedStaff.update((staffs) => {
        if (this.displaySelectedStaff().some(staff => staff.name === value)) {
          return [...staffs]
        }
        else {
          var addStaff = this.staffs.find(staff => staff.name === value);
          if(addStaff && !this.displaySelectedStaff().some(staff => staff.name === value) ){
            return [...staffs, addStaff]
          }
          return staffs;
        }
      });
    }
  }
  optionSelect(e: MatAutocompleteSelectedEvent) {
    var value = e.option.viewValue;
    this.enteredStaff.set('');
    this.displaySelectedStaff.update((staffs: { _id: string; name: string; }[])  => {
      var addStaff = this.staffs.find(staff => staff.name === value);
      if (addStaff && !this.displaySelectedStaff().some(staff => staff.name === value)) {
        e.option.deselect();
        return [...staffs,addStaff]
      }
      else {
        e.option.deselect();  
        return [...staffs]
      }
    }
    )
  }
  //Req to backend
  submit() {
    if (this.slots().length === 0 || this.displaySelectedStaff().length === 0
      || this.startDate === '' || this.endDate === '') {
      alert('enter Data');
    }
    else {
      let staffs = this.displaySelectedStaff();
      this.SlotGenerationServie.openDialog(staffs, this.slots(), this.startDate, this.endDate)
    }
    
  }
  removeStaff(inputstaff: string) {
    this.displaySelectedStaff.update(staff => {
      return staff.filter(staff => staff.name !== inputstaff);
    })
  }
  generateSlot() {
    if (this.data.morningBreak === '' || this.data.eveningBreak === ''
      || this.data.lunchStart === '' || this.data.lunchEnd === '' || this.data.range === 0) {
      alert('enter data')
    }
    else {
      console.log("generated Timings are : " + this.data.morningBreak + " ," + this.data.eveningBreak + " ," + this.data.lunchEnd + " ," + this.data.lunchStart + " ," + this.data.lunchStart + " ," + this.data.range);
      this.slots.set(this.SlotGenerationServie.generate(this.data));
      this._snackBar.open("Generated Successfully", "Done");
      console.log(this.slots);
    }

  }

  tableClick(e: Event) {
    console.log(e.currentTarget);
    this._snackBar.open("opend", "close");
  }
  onClick(staff: data) {
    this._dialogService.openStatusDialog(staff);
    console.log(staff.slots());
  }

  
}
