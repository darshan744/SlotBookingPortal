import {  Component, inject, OnInit ,ViewChild} from '@angular/core';
import {   FormsModule,  } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../Services/AdminServices/admin-service.service';
import { IStudentInfo } from '../../../Models/Admin.model';
import { environment } from '../../../../environments/environment.development';
import { Subscription } from 'rxjs';
import {FloatLabelModule} from 'primeng/floatlabel'
import {InputTextModule} from 'primeng/inputtext'
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
interface IStudentData {
  id : string,
  name : string,
  email:string,
  year:string,
  department : string,
  resume : string,
}
@Component({
  selector: 'app-admin-student-search',
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    FloatLabelModule,
  ],
  templateUrl: './admin-student-search.component.html',
  styleUrl: './admin-student-search.component.css',
})
export class AdminStudentSearchComponent implements OnInit {
  breakPointSubscription: Subscription | null = null;
  private _service = inject(AdminService);
  private _url = environment.BASE_URL;
  filterValue: string = '';
  spinner: boolean = false;
  data : IStudentData[] = [];
  displayColumns = ['Id', 'Name', 'Email', 'Department', 'Year', 'Resume'];
  ngOnInit(): void {
    this._service.getAllStudent().subscribe((e: IStudentInfo) => {
      this.data = e.data;
      this.spinner = false;
    });
  }

  url(fileLink: string) {
    return this._url + '/' + encodeURIComponent(fileLink);
  }
  isMobile: boolean = false;

  filter(event : Event) {
    return (event.target as HTMLInputElement).value
  }
  ngOnDestroy() {
    if (this.breakPointSubscription) this.breakPointSubscription.unsubscribe();
  }
}
