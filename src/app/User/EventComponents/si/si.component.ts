import { CommonModule } from '@angular/common';
import { Component, Inject, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { DialogOpenService } from '../../../Services/DialogOpenService/dialog.service';
import { SlotDataSevice } from '../../../Services/SlotDataService/SlotData.service';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { UserService } from '../../../Services/StudentService/user.service';
@Component({
  selector: 'app-si',
  standalone: true,
  imports: [CommonModule,MatTabsModule,MatButton,
    MatAccordion,MatExpansionModule,MatIcon
  ],
  templateUrl: './si.component.html',
  styleUrl: './si.component.css'
})
export class SiComponent {
  dates = ['Aug 11', 'Aug 12', 'Aug 13', 'Aug 14', 'Aug 15', 'Aug 16'];
  data : any = []
  @Inject(DialogOpenService) dialogService !:DialogOpenService;
  constructor(private Service : UserService) {}
  slotDataService = inject(SlotDataSevice);
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
   this.Service.getSlots().subscribe(e=>console.log(e));
    console.log(this.data);
  }
  eventType = 'SelfIntroduction'
  timingsData = this.slotDataService.timingsGroup[this.eventType];
  bookTime(time: string) {
    alert(`You have booked the slot: ${time}`);
    // Handle the booking logic here...
  }
}
