import {
  AfterViewInit,
  Component,
  inject,
  signal,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { AdminService } from '../../../Services/AdminServices/admin-service.service';
import { event, eventResponseServer } from '../../../Models/slot-breaks';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatDatepickerInputEvent,MatDatepickerModule,} from '@angular/material/datepicker';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatInput } from '@angular/material/input';
import {  provideNativeDateAdapter } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DialogOpenService } from '../../../Services/DialogOpenService/dialog.service';
import { ToastrService } from '../../../Services/Toastr/toastr.service';
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
    MatCheckboxModule,MatProgressSpinnerModule
  ],
  templateUrl: './admin-events.component.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './admin-events.component.css',
})
export class AdminEventsComponent implements AfterViewInit {
  // private readonly _formate = inject(DateAdapter);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource!: MatTableDataSource<event>;
  selectedDate: string = '';
  constructor(private service: AdminService) { }
  private snackBar = inject(DialogOpenService);
  private toast = inject(ToastrService);
  dupData: event[] = [];
  isLoading = true;
  dataLength = signal<Number>(0);
  columns = ['No', 'Date', 'Time', 'Action'];
  responseDeadline : Date | null = null
  ngOnInit() {
    try {
      this.service
        .getAvailabilityRequest()
        .subscribe({
          next:(response: eventResponseServer) => {
            this.isLoading = (false);
            this.responseDeadline = response.responseDeadline
            const slots = response.slots;
            this.dataSource = new MatTableDataSource<event>(slots);
            this.dupData = this.dataSource.data;
            this.dataSource.paginator = this.paginator;
            this.dataLength.set(this.dataSource.data.length);
        },
        error:(err)=> {
          console.log(err);
          this.toast.showToast(err.message, false , 'info');
          //this.snackBar.openSnackBar('Please try after some time')
        }
      });
    } catch (error) {
      this.toast.showToast('Unknown Error Occured', true);
      //this.snackBar.openSnackBar("Unknown Error Occured");
    }
  }
  ngAfterViewInit(): void {

  }
  acceptEvent(e: { date: string; time: string; isAvailable: string }) {
    e.isAvailable = 'Accepted';
    console.log(this.dupData);
    this.dataSource.data = this.dataSource.data.filter(
      (el) => !(el.date === e.date && el.time === e.time)
    );
    // this.service.postAvailabilityResponse(e);
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
  clear() {
    this.selectedDate = '';
    this.dataSource.filter = '';
  }
  fillFn(fill : string) {
    const date = new Date(this.selectedDate).toISOString();
    if (date === null) {
      alert('Please Select A Date');
    }
    const found = this.dataSource.data.find((e: event) => e.date === date);
    let send: event[] = [];
    if (!found) {
      console.log('Not Found');
    } else {
      this.dataSource.data.forEach((e) => {
        if (e.date === date) {
          e.isAvailable = fill;
          send.push(e);
        }
      });
      this.dataSource.data = this.dataSource.data.filter(
        (e) => !(e.date === date)
      );
      console.log(send);
      this.service.postAvailabilityResponse(send);
    }
  }

  filter(event: MatDatepickerInputEvent<Date>) {
    let inputVal : Date | null | string | undefined = (event.value);
    inputVal?.setHours(20);
    inputVal= inputVal?.toISOString();
    if (inputVal && this.dataSource.data.find((e) => e.date === inputVal)) {
      this.dataSource.filter = inputVal;
      this.dataSource.paginator?.firstPage();
    } else {
      alert('Date Not Found');
    }
  }
}
