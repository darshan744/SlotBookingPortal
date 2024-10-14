import {  AfterViewInit, Component,inject, ViewChild } from '@angular/core';
import {  MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { AdminServiceService } from '../../Services/AdminServices/admin-service.service';
import {event,eventResponseServer} from '../../Models/slot-breaks'
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-admin-events',
  standalone: true,
  imports: [MatTableModule,MatButtonModule,MatPaginatorModule,CommonModule],
  templateUrl: './admin-events.component.html',
  styleUrl: './admin-events.component.css'
})
export class AdminEventsComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  dataSource !: MatTableDataSource<event>;
  constructor(private service : AdminServiceService){
    
  }
  private snackBar = inject(MatSnackBar)
  
  columns = ['No','Date','Time','Action']; 

  ngAfterViewInit(): void {
    this.service.getAvailabilityRequest().subscribe((response : eventResponseServer)  => {
      this.dataSource = new MatTableDataSource<event>(response.slots);
      this.dataSource.paginator = this.paginator;
      console.log(response.slots);
      console.log(this.groupSlotsByHour(response.slots))
    });
  }
  cancelEvent(e:event){
    
  }
  
  groupSlotsByHour(slots: event[]) {
    const hourGroupedSlots = slots.map(event => {
      // Group the slots by hour
      const groupedSlots = event.slots.reduce((acc: any, slot: any) => {
        const hour = slot.time.split(":")[0]; // Extract the hour from time (e.g., "09" from "09:00 - 09:15")
        if (!acc[hour]) acc[hour] = [];
        acc[hour].push({ time: slot.time, isAvailable: slot.isAvailable });
        return acc;
      }, {});
  
      return {
        date: event.date,
        groupedSlots: Object.keys(groupedSlots).map(hour => ({
          hour,
          slots: groupedSlots[hour]
        }))
      };
    });
  
    return hourGroupedSlots;
  }

  
}
