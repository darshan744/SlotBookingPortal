import {
  Component,
  inject,
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
import {  MatDividerModule } from '@angular/material/divider';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SuperAdminService } from '../../../Services/SuperAdminServices/SlotGenerate/super-admin.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import {
  DateFilterFn,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { provideNativeDateAdapter } from '@angular/material/core';
import { DialogOpenService } from '../../../Services/DialogOpenService/dialog.service';
import {TAcceptedStaff, Venues, ISlot, ITimeAndLimit, IBreaks} from "../SuperAdmin.interface";
import {HttpErrorResponse} from "@angular/common/http";

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
  breaks : IBreaks[] = [] as any;
  selectedYear : string | null = null


  constructor(
    private service: SuperAdminService,
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
        selectedBreakConfig : new FormControl<string>('',Validators.required),
        range: new FormControl<number>(0, [Validators.required]),
      }),
    });
  }

  @ViewChild('DialogTemplate') dialogComp!: TemplateRef<string[]>;

  dialogService = inject(DialogOpenService)
  /**--------------------------------Results -------------------------- */

  slots = signal<string[]>([]);
  venues = signal<Venues[]>([]);

  /**-------------------------------Bindings--------------------- */

  acceptedStaff = signal<TAcceptedStaff[]>([]);

  staffInput: string = '';
  startDate: string = '';
  endDate: string = '';

  /**Methods */
  ngOnInit(): void {
    this.getBreaks()
    this.getAcceptedStaffs()
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
      // this.form.get('data.morningBreak')?.value === '' ||
      // this.form.get('data.eveningBreak')?.value === '' ||
      // this.form.get('data.lunchStart')?.value === '' ||
      // this.form.get('data.lunchEnd')?.value === '' ||
      this.form.get('data.range')?.value === 0
    ) {
      alert('enter data');
    } else {
      const selectedBreakConfig = this.form.get('data.selectedBreakConfig');
      if(selectedBreakConfig?.valid) {
        const breakTimings = this.breaks.find(b => b.configurationId === selectedBreakConfig?.value );
        if(breakTimings) {
          const slotData = {
            morningBreak: breakTimings?.breaks.morningBreak,
            eveningBreak: breakTimings?.breaks.eveningBreak,
            lunchStart: breakTimings?.breaks.lunchStart,
            lunchEnd: breakTimings?.breaks.lunchEnd,
            range: this.form.get('data.range')?.value as number,
          };

          this.slots.set(this.service.generate(slotData));
        }
        else {
          alert('Not Found');
          return;
        }
      }
      else {
        alert('Not Valid');
        return;
      }
      this._snackBar.open('Generated Successfully', 'Done', { duration: 3000 });
      this.dialog.open(this.dialogComp);
    }

  }

  addStaff() {
    const venue = this.form.get('enteredData.venue');
    const staffs = this.form.get('enteredData.staff');
    if (venue?.valid && staffs?.valid) {
      const venueValue : string = venue.value;
      const staffValue : string = staffs.value;
      this.venues.update((value) => {
        const updatedVenues = value.map((el) => {
          // Check if the venue matches the input

          if (el.venue === venueValue) {
            // If it exists, check if the staff already exists
            if (!el.staffs.includes(staffValue)) {
              // Add the staff to the existing venue
              return {
                ...el,
                staffs: [...el.staffs, staffValue], // Create a new array for staffs
              };
            }
          }
          return el; // Return the original venue if no changes
        });

        // If venue does not exist, add it as a new entry
        if (!updatedVenues.some((v) => v.venue === venueValue)) {
          updatedVenues.push({
            venue: venueValue,
            staffs: [staffValue],
          });
        }
        return updatedVenues;
      });
      this.acceptedStaff.update((val): TAcceptedStaff[] => {
        return val.map((e) => {
          if (e.id === staffValue) {
            return { ...e, display: false };
          }
          return e;
        });
      });
      this.acceptedStaffs;
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
    this.acceptedStaff.update((el: TAcceptedStaff[]) => {
      return el.map((e: TAcceptedStaff) => {
        return e.id === val ? { ...e, display: true } : e;
      });
    });
  }

  validate(obj: any): boolean {
    for (const [key, val] of Object.entries(obj)) {
      if ( val === undefined ||  val === null || val === '' ||  (Array.isArray(val) && val.length === 0) ) {
        return false;
      }
    }
    return true;
  }

  public get acceptedStaffs(): TAcceptedStaff[] {
    return this.acceptedStaff().filter((e) => e.display && e.forYear === this.form.get('enteredData.selectedYear')?.value);
  }

  submit(): void {
    let slots : ITimeAndLimit[] = this.slots().map((e:string):{time:string, limit:number} =>
      ({ time: e, limit: this.form.get('enteredData.limit')?.value })
    );

    const data :ISlot = {
      startDate:this.form.get('enteredData.startDate')?.value,
      endDate:this.form.get('enteredData.endDate')?.value,
      eventType:this.form.get('enteredData.selectedEvent')?.value,
      year:this.form.get('enteredData.selectedYear')?.value,
      limit:this.form.get('enteredData.limit')?.value,
      slots:slots,//{time:string, limit:number}[]
      venuesAndStaffs: this.venues().map(e=>e)//venue:string , staffs:string[]
    }
    if (this.validate(data)) {
      this.service.postSlot(data);
    } else {
      alert('enter Data ');
    }
  }

  getAcceptedStaffs() {
    this.service.getAcceptedResponse().subscribe({
      next: (res) => {
        this.acceptedStaff.set(
          res.data.map((e) => ({
            id: e.instructorId.id,
            name: e.instructorId.name,
            display: true,
            forYear: e.forYear
          }))
        );
      },
      error: (e) => {
        this.dialogService.openSnackBar(e.error.message);
      },
    });
  }

  getBreaks() {
    this.service.getBreaks().subscribe({
      next:data=> {
        this.breaks = data.data;
      },
      error : (err : HttpErrorResponse) => {
        this.dialogService.openSnackBar(err.message)
      }
    })
  }
}
