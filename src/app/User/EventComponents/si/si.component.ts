import { CommonModule } from '@angular/common';
import { Component, Inject, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { DialogOpenService } from '../../../Services/DialogOpenService/dialog.service';
import { timingsGroup } from '../../../Services/SlotData.service';
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


  timingsData = timingsGroup['Timing 2'];

  getVenues(date :string) {
    return Object.keys(this.timingsData[date]);
  }
  expansion(opened:string,event:boolean) {
    const exp = document.getElementById(opened);
    event === true ? exp?.classList.add('highlight-venue'):exp?.classList.remove('highlight-venue');
    console.log(exp?.classList);    
  }
  eventType = 'SelfIntroduction'

  bookTime(time: string) {
    alert(`You have booked the slot: ${time}`);
    // Handle the booking logic here...
  }
}
