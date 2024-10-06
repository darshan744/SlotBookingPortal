import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {  MatTabChangeEvent, MatTabsModule} from '@angular/material/tabs';
import { MatDialogModule} from '@angular/material/dialog';
import { DialogOpenService } from '../../../Services/DialogOpenService/dialog.service';
import {SlotDataSevice} from '../../../Services/SlotData.service'
import {MatExpansionModule,MatAccordion} from '@angular/material/expansion'
import { MatIcon } from '@angular/material/icon';
@Component({
  selector: 'app-mi',
  standalone: true,
  imports: [CommonModule,MatButtonModule,MatTabsModule,MatDialogModule,MatExpansionModule,MatAccordion,MatIcon],
  templateUrl: './mi.component.html',
  styleUrl: './mi.component.css'
})
export class MiComponent {

  dialogService = inject(DialogOpenService)
  slotDataService = inject(SlotDataSevice);

  // constructor(private dialogService : DialogOpenService){}

  dates = ['Aug 11', 'Aug 12', 'Aug 13', 'Aug 14', 'Aug 15', 'Aug 16'];
  selectedDate: number = 0;
  availableTimings: string[] = [];
  s:boolean = true;
  timingsData = this.slotDataService.timingsGroup['Timing 1'];
  eventType = 'MockInterview'

  expansion(opened:string,event:boolean) {
    const exp = document.getElementById(opened);
    event === true ? exp?.classList.add('highlight-venue'):exp?.classList.remove('highlight-venue');
    console.log(exp?.classList);    
  }
  isOpened = signal(false);
}
