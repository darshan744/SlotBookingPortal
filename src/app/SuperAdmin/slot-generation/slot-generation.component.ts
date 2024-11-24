import {
  Component,
  OnInit,
  signal,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatChipEvent, MatChipsModule } from '@angular/material/chips';
import { MatDivider, MatDividerModule } from '@angular/material/divider';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { SlotBreaks } from '../../Models/slot-breaks';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SuperAdminService } from '../../Services/SuperAdminServices/SlotGenerate/super-admin.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import {
  DateFilterFn,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { map } from 'rxjs';
import { provideNativeDateAdapter } from '@angular/material/core';
interface Venues {
  venue: string;
  staffs: string[];
}
type AcceptedResponse = {
  success: boolean;
  data: {
    instructorId: {
      staffId: string;
      name: string;
    };
    unmodifiedCount: number;
  }[];
};
type AcceptedStaff = {
  staffId: string;
  name: string;
  display: boolean;
};

@Component({
  selector: 'app-slot-generation',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatChipsModule,
    NgxMatTimepickerModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatDatepickerModule,
    FormsModule,
    MatIconModule,
  ],
  providers:[provideNativeDateAdapter()],
  templateUrl: './slot-generation.component.html',
  styleUrl: './slot-generation.component.css',
})
export class SlotGenerationComponent implements OnInit {
  form: FormGroup;

  constructor(
    private Service: SuperAdminService,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      enteredData: new FormGroup({
        venue: new FormControl<string>('', [Validators.required]),
        staff: new FormControl<string>('', [Validators.required]),
        limit: new FormControl<number>(0, [Validators.required]),
        startDate: new FormControl<string>('', [Validators.required]),
        endDate: new FormControl<string>('', [Validators.required]),
        selectedEvent: new FormControl<string>('', [Validators.required]),
        selectedYear: new FormControl<string>('', [Validators.required]),
      }),
      data: new FormGroup({
        morningBreak: new FormControl<string>('', [Validators.required]),
        eveningBreak: new FormControl<string>('', [Validators.required]),
        lunchStart: new FormControl<string>('', [Validators.required]),
        lunchEnd: new FormControl<string>('', [Validators.required]),
        range: new FormControl<number>(0, [Validators.required]),
      }),
    });
  }
  @ViewChild('DialogTemplate') dialogComp!: TemplateRef<string[]>;

  /**--------------------------------Results -------------------------- */

  slots = signal<string[]>([]);
  venues = signal<Venues[]>([]);

  /**-------------------------------Bindings--------------------- */

  acceptedStaff = signal<AcceptedStaff[]>([]);

  selectedEvent = '';
  selectedYear = '';
  venueInput: string = '';
  staffInput: string = '';
  limit: number = 0;
  startDate: string = '';
  endDate: string = '';

  /**-----------------------------------Methods----------------------------------------- */
  ngOnInit(): void {
    this.Service.getAcceptedResponse().subscribe({
      next: (res) => {
        this.acceptedStaff.set(
          res.data.map((e) => ({
            staffId: e.instructorId.staffId,
            name: e.instructorId.name,
            display: true,
          }))
        );
      },
      error: (e) => {
        console.log(e.message);
      },
      complete() {
        console.log('Receieved Response');
      },
    });
  }
  dateFilter: DateFilterFn<Date | null> = (date: Date | null): boolean => {
    if (!date) return false;
    let day = (date || new Date()).getDay();
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    return day !== 0 && date >= today;
  };
  generateSlot() {
    if (
      this.form.get('data.morningBreak')?.value === '' ||
      this.form.get('data.eveningBreak')?.value === '' ||
      this.form.get('data.lunchStart')?.value === '' ||
      this.form.get('data.lunchEnd')?.value === '' ||
      this.form.get('data.range')?.value === 0
    ) {
      alert('enter data');
    } else {
      this._snackBar.open('Generated Successfully', 'Done', { duration: 3000 });
      const slotData = {
        morningBreak: this.form.get('data.morningBreak')?.value as string,
        eveningBreak: this.form.get('data.eveningBreak')?.value as string,
        lunchStart: this.form.get('data.lunchStart')?.value as string,
        lunchEnd: this.form.get('data.lunchEnd')?.value as string,
        range: this.form.get('data.range')?.value as number,
      };
      this.slots.set(this.Service.generate(slotData));
      console.log(this.slots());
      this.dialog.open(this.dialogComp);
    }
  }
  addStaff() {
    if (this.venueInput !== '' && this.staffInput !== '') {
      this.venues.update((value) => {
        const updatedVenues = value.map((el) => {
          // Check if the venue matches the input
          if (el.venue === this.venueInput) {
            // If it exists, check if the staff already exists
            if (!el.staffs.includes(this.staffInput)) {
              // Add the staff to the existing venue
              return {
                ...el,
                staffs: [...el.staffs, this.staffInput], // Create a new array for staffs
              };
            }
          }
          return el; // Return the original venue if no changes
        });

        // If venue does not exist, add it as a new entry
        if (!updatedVenues.some((v) => v.venue === this.venueInput)) {
          updatedVenues.push({
            venue: this.venueInput,
            staffs: [this.staffInput],
          });
        }
        return updatedVenues;
      });
      this.acceptedStaff.update((val): AcceptedStaff[] => {
        return val.map((e) => {
          if (e.staffId === this.staffInput) {
            return { ...e, display: false };
          }
          return e;
        });
      });
      this.acceptedStaffs;
      console.log(this.venues());
      this.staffInput = '';
    }
  }
  removeStaff(e: MatChipEvent) {
    let val = e.chip.value;
    this.venues.update((values) => {
      return values.map((el) => ({
        ...el,
        staffs: el.staffs.filter((e) => e !== val),
      }));
    });
    this.acceptedStaff.update((el: AcceptedStaff[]) => {
      return el.map((e: AcceptedStaff) => {
        return e.staffId === val ? { ...e, display: true } : e;
      });
    });
    console.log(e.chip.value);
  }
  validate(obj: any): boolean {
    for (const [key, val] of Object.entries(obj)) {
      if (
        val === undefined ||
        val === null ||
        val === '' ||
        (Array.isArray(val) && val.length === 0)
      ) {
        return false;
      }
    }
    return true;
  }

  public get acceptedStaffs(): AcceptedStaff[] {
    return this.acceptedStaff().filter((e) => e.display);
  }

  submit(): void {
    let slots = this.slots().map((e) => ({ time: e, limit: this.limit }));

    const data = {
      startDate: this.startDate,
      endDate: this.endDate,
      eventType: this.selectedEvent,
      year: this.selectedYear,
      limit: this.limit,
      slots: this.venues().map(({ venue, staffs }) => ({
        venue,
        staffs,
        slots,
      })),
    };
    if (this.validate(data)) {
      this.Service.postSlot(data);
      console.log(data);
    } else {
      alert('enter Data ');
    }
  }
}
