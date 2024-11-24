import {
  AfterViewInit,
  Component,
  inject,
  signal,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { AdminServiceService } from '../../Services/AdminServices/admin-service.service';
import { event, eventResponseServer } from '../../Models/slot-breaks';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  MatDatepickerInputEvent,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatInput } from '@angular/material/input';
import { DateAdapter, provideNativeDateAdapter } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
@Component({
  selector: 'app-admin-events',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    MatInput,
    MatIcon,
    MatDatepickerModule,
    MatFormFieldModule,
    CommonModule,
    FormsModule,
    MatCheckboxModule,
  ],
  templateUrl: './admin-events.component.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './admin-events.component.css',
})
export class AdminEventsComponent implements AfterViewInit {
  private readonly _formate = inject(DateAdapter);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  
  dataSource!: MatTableDataSource<event>;
  selectedDate: string = '';
  constructor(private service: AdminServiceService) {}
  private snackBar = inject(MatSnackBar);
  dupData: event[] = [];
  isLoading = signal<Boolean>(true);
  dataLength = signal<Number>(0);
  columns = ['No', 'Date', 'Time', 'Action'];

  ngAfterViewInit(): void {
    this._formate.setLocale('en-In');
    this.service
      .getAvailabilityRequest()
      .subscribe((response: eventResponseServer) => {
        const slots = response.slots;
        this.dataSource = new MatTableDataSource<event>(slots);
        this.dupData = this.dataSource.data;
        this.dataSource.paginator = this.paginator;
        this.isLoading.set(false);
        console.log(this.isLoading())
        this.dataLength.set(this.dataSource.data.length);
      });
  }
  acceptEvent(e: { date: string; time: string; isAvailable: string }) {
    e.isAvailable = 'Accepted';
    console.log(e);
    this.dataSource.data = this.dataSource.data.filter(
      (el) => !(el.date === e.date && el.time === e.time)
    );

  }
  cancelEvent(e: { date: string; time: string; isAvailable: string }) {
    e.isAvailable = 'Declined';
    console.log(e);
    this.dataSource.data = this.dataSource.data.filter(
      (el) => !(el.date === e.date && el.time === e.time)
    );
  }
  submit() {
    const result = this.dupData.filter((e) => e.isAvailable !== 'unmodified');
    console.log(result);
    if (!(result.length === 0)) {
      this.service.postAvailabilityResponse(result);
    }
    this.dupData = this.dupData.filter((e) => e.isAvailable === 'unmodified');
  }
  public get data() {
    return this.dataSource;
  }

  acceptForSelectedDate() {
    const date = new Date(this.selectedDate).toLocaleDateString('en-CA');
    if (date === 'Invalid Date') {
      alert('Please Select A Date');
    }
    const found = this.dataSource.data.find((e: any) => e.date === date);
    let send: event[] = [];
    if (!found) {
      console.log('Not Found');
    } else {
      this.dataSource.data.forEach((e) => {
        if (e.date === date) {
          e.isAvailable = 'Accepted';
          send.push(e);
        }
      });
      this.dataSource.data = this.dataSource.data.filter(
        (e) => !(e.date === date)
      );
      this.service.postAvailabilityResponse(send);
    }
  }
  clear() {
    this.selectedDate = '';
    this.dataSource.filter = '';
  }

  cancelForSelectedDate() {
    const date = new Date(this.selectedDate).toLocaleDateString('en-CA');
    if (date === 'Invalid Date') {
      alert('Please Select A Date');
    }
    const found = this.dataSource.data.find((e: any) => e.date === date);
    let send: event[] = [];
    if (!found) {
      console.log('Not Found');
    } else {
      this.dataSource.data.forEach((e) => {
        if (e.date === date) {
          e.isAvailable = 'Declined';
          send.push(e);
        }
      });
      this.dataSource.data = this.dataSource.data.filter(
        (e) => !(e.date === date)
      );
      this.service.postAvailabilityResponse(send);
    }
  }

  filter(event: MatDatepickerInputEvent<Date>) {
    let inputVal = event.value;
    let filterVal = '';
    if (inputVal) {
      filterVal = new Date(inputVal).toLocaleDateString('en-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
      console.log(filterVal);
    }
    if (this.dataSource.data.find((e) => e.date === filterVal)) {
      this.dataSource.filter = filterVal;
      this.dataSource.paginator?.firstPage();
    } else {
      alert('Date Not Found');
    }
  }
}
