import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component,  signal  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule} from '@angular/material/form-field';
import {  MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete'
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import {   provideNativeDateAdapter } from '@angular/material/core';


@Component({
  selector: 'app-create',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelect, MatOption, CommonModule, 
    FormsModule, MatIconModule,MatButtonModule, MatDatepickerModule, 
    MatAutocompleteModule, MatChipsModule
  ],
  providers:[provideNativeDateAdapter()],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class CreateComponent {

  filteredStaff: any;
  enteredStaff = signal('');
  displaySelectedStaff = signal<string[]>([])
  selectedEvent : string = '';
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
}
