import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatOption } from '@angular/material/select';
import { DateFilterFn, MatDatepickerModule } from '@angular/material/datepicker'
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete'
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { provideNativeDateAdapter } from '@angular/material/core';
import { SuperAdminService } from '../../Services/SuperAdminServices/SlotGenerate/super-admin.service';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { staffs } from '../../Models/slot-breaks';
@Component({
  selector: 'app-create',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatOption, CommonModule,
    FormsModule, MatIconModule, MatButtonModule, MatDatepickerModule, MatTabsModule,
    MatAutocompleteModule, MatChipsModule, MatCardModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateComponent {

  /**Services */
  Service = inject(SuperAdminService);

  /**----------properties-------------------- */
  enteredStaff = signal('');
  displaySelectedStaff = signal<staffs["data"]>([])
  slots = signal<string[]>([]);
  startDate: string = ''
  endDate: string = ''
  responseDeadline: Date | null = null;
  staffs: staffs["data"] = [];

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
          if (addStaff && !this.displaySelectedStaff().some(staff => staff.name === value)) {
            return [...staffs, addStaff]
          }
          return staffs;
        }
      });
    }
  }
  optionSelect(e: MatAutocompleteSelectedEvent) {
    let value = e.option.viewValue.split('-')[1].trimStart();
    console.log(value);
    this.enteredStaff.set('');
    this.displaySelectedStaff.update((staffs: {id: string, name: string, }[]) => {
      let addStaff = this.staffs.find(staff => staff.id === value);
      if (addStaff && !this.displaySelectedStaff().some(staff => staff.name === value)) {
        e.option.deselect();
        return [...staffs, addStaff]
      }
      else {
        e.option.deselect();
        return [...staffs]
      }
    }
    )
  }
  dateFilter :DateFilterFn<Date | null> = (date: Date | null): boolean => {
    if (!date) return false;
    var day = (date || new Date()).getDay();
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    return day !== 0 && date >= today;
  }

  ngOnInit(): void {
    this.Service.getAllStaff().subscribe((e: staffs) => {
      console.log(e.data);
      this.staffs = e.data
    });
  }
  removeStaff(inputstaff: string) {
    this.displaySelectedStaff.update(staff => {
      return staff.filter(staff => staff.name !== inputstaff);
    })
  }

  //Open Dialog
  submit() {
    console.log(this.responseDeadline);
    console.log(this.displaySelectedStaff());
    console.log(this.startDate , this.endDate);
    if (this.responseDeadline && this.displaySelectedStaff().length !== 0 &&
      this.startDate !== '' && this.endDate !== '')
    {
      if(new Date(this.startDate).getDate() > this.responseDeadline.getDate()) {
        let staffs = this.displaySelectedStaff();
        this.responseDeadline.setHours(23);
        this.responseDeadline.setMinutes(59);
        this.responseDeadline.setSeconds(59);
        this.Service.openDialog(staffs, this.slots(), this.startDate, this.endDate, this.responseDeadline)
      }
      else {
        alert('Starting Date must be greater than Deadline')
      }
    }
    else {
      alert('Enter Data');
    }

  }
}
