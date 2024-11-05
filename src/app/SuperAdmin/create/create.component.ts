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
import { SuperAdminService } from '../../Services/SuperAdminServices/SlotGenerate/super-admin.service';
import { MatCardModule } from '@angular/material/card';
import { SlotBreaks, staffs } from '../../Models/slot-breaks';
import { MatTabsModule } from '@angular/material/tabs';
import { SlotGenerationComponent } from "../slot-generation/slot-generation.component";
import {StatusTabComponent} from '../status-tab/status-tab.component'
@Component({
  selector: 'app-create',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelect, MatOption, CommonModule,
    FormsModule, MatIconModule, MatButtonModule, MatDatepickerModule, MatTabsModule,
    MatAutocompleteModule, MatChipsModule, MatCardModule, SlotGenerationComponent,
    StatusTabComponent],
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
    this.Service.getAllStaff().subscribe((e : staffs)=>{
      this.staffs = e.data
    });
  }
  /**Services */
  Service = inject(SuperAdminService);
  /**----------Variables-------------------- */
  enteredStaff = signal('');
  displaySelectedStaff = signal<staffs["data"]>([])
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

  staffs:staffs["data"] = [];
  /*---------------Sample Data---------------*/
  //both are to be retreived from backend
  // staffs: string[] = ['Jhon Doe', 'Steve Smith', 'Virat kholi', 'John smith',
  //   'Rhodeans Joe', 'Vin Diesel', 'Paul', 'Gates', 'Subramani', 'Aaron', 'Rohith'];

  /*----------Methods----------*/
  add(e: MatChipInputEvent) {
    var value = e.value.trim();
    console.log(value);
    this.enteredStaff.set('');
    if (value) {
      this.displaySelectedStaff.update((staffs) => {
        if (this.displaySelectedStaff().some(staff => staff.name === value)) {
          return [...staffs]
        }
        else {
          let addStaff = this.staffs.find(staff => staff.name === value);
          if(addStaff && !this.displaySelectedStaff().some(staff => staff.name === value) ){
            return [...staffs, addStaff]
          }
          return staffs;
        }
      });
    }
  }
  optionSelect(e: MatAutocompleteSelectedEvent) {
    let value = e.option.viewValue.split('-')[0].trim();
    console.log(value);
    this.enteredStaff.set('');
    this.displaySelectedStaff.update((staffs: { _id: string, staffId: string, name: string, }[])  => {
      let addStaff = this.staffs.find(staff => staff.name === value);
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
    if ( this.displaySelectedStaff().length === 0
      || this.startDate === '' || this.endDate === '') {
      alert('enter Data');
    }
    else {
      let staffs = this.displaySelectedStaff();
      this.Service.openDialog(staffs, this.slots(), this.startDate, this.endDate)
    }
    
  }
  removeStaff(inputstaff: string) {
    this.displaySelectedStaff.update(staff => {
      return staff.filter(staff => staff.name !== inputstaff);
    })
  }
  
}
