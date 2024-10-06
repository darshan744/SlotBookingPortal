import { CommonModule } from '@angular/common';
import { Component, Inject, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { DialogOpenService } from '../../../Services/DialogOpenService/dialog.service';
import { SlotDataSevice } from '../../../Services/SlotData.service';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatIcon } from '@angular/material/icon';

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

    @Inject(DialogOpenService) dialogService !:DialogOpenService;

  slotDataService = inject(SlotDataSevice);

  eventType = 'SelfIntroduction'
  timingsData = this.slotDataService.timingsGroup[this.eventType];
  bookTime(time: string) {
    alert(`You have booked the slot: ${time}`);
    // Handle the booking logic here...
  }
}
