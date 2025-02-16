import { CommonModule } from '@angular/common';
import {ChangeDetectionStrategy, Component, inject, OnInit, signal} from '@angular/core';
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
import { SuperAdminService } from '../../../Services/SuperAdminServices/SlotGenerate/super-admin.service';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { staffs } from '../../../Models/slot-breaks';
import {IStaff, IStaffAndEvents} from "../../Super-Admin-Pages/SuperAdmin.interface";
@Component({
    selector: 'app-create',
    imports: [MatFormFieldModule, MatInputModule, MatOption, CommonModule,
        FormsModule, MatIconModule, MatButtonModule, MatDatepickerModule, MatTabsModule,
        MatAutocompleteModule, MatChipsModule, MatCardModule,
    ],
    providers: [provideNativeDateAdapter()],
    templateUrl: './create.component.html',
    styleUrl: './create.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateComponent implements OnInit{

  /**Services */
  Service = inject(SuperAdminService);

  /**Properties */
  enteredStaff = signal('');
  displaySelectedStaff = signal<staffs["data"]>([])
  slots = signal<string[]>([]);
  startDate: string = ''
  endDate: string = ''
  responseDeadline: Date | null = null;
  staffs: IStaff[] = [] as any;
  events : string[] = [];
  forYear : string = '';
  eventTypeRequest : string = '';

  /**Methods*/

  addStaffToChip(e: MatAutocompleteSelectedEvent) {
    let value = e.option.viewValue.split('-')[1].trimStart();
    this.enteredStaff.set('');
    this.displaySelectedStaff.update((staffs: {id: string, name: string, }[]) => {
      let addStaff = this.staffs.find(staff => staff.id === value);
      if (addStaff && !(this.displaySelectedStaff().some(staff => staff.id === value))) {
        e.option.deselect();
        return [...staffs, addStaff]
      }
      else {
        e.option.deselect();
        return [...staffs]
      }
    })
  }

  dateFilter :DateFilterFn<Date | null> = (date: Date | null): boolean => {
    if (!date) return false;
    let day = (date || new Date()).getDay();
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    return day !== 0 && date >= today;
  }

  ngOnInit(): void {
    this.Service.getStaffAndEvents().subscribe((e: IStaffAndEvents) => {
      this.staffs = e.staffs
      this.events = e.events;

    });
  }

  removeStaff(inputStaff: string) {
    this.displaySelectedStaff.update(staff => staff.filter(staff => staff.name !== inputStaff)
    )
  }

  //Open Dialog
  submit() {
    if (this.responseDeadline && this.displaySelectedStaff().length !== 0 &&
      this.startDate !== '' && this.endDate !== '')
    {
      if(new Date(this.startDate) > this.responseDeadline) {
        let staffs = this.displaySelectedStaff() , forYear = this.forYear , eventTypeRequest  = this.eventTypeRequest;

        this.responseDeadline.setHours(23);
        this.responseDeadline.setMinutes(59);
        this.responseDeadline.setSeconds(59);
        this.Service.openDialog(staffs,  this.startDate, this.endDate, this.responseDeadline , forYear , eventTypeRequest);
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
