import { CommonModule } from '@angular/common';
import { Component, inject, Inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { DialogOpenService } from '../../../Services/DialogOpenService/dialog.service';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatIcon } from '@angular/material/icon';
import { SlotDataSevice } from '../../../Services/SlotDataService/SlotData.service';
@Component({
  selector: 'app-gd',
  standalone: true,
  imports: [CommonModule,MatTabsModule,MatButton,MatAccordion,MatExpansionModule,MatIcon],
  templateUrl: './gd.component.html',
  styleUrls: ['./gd.component.css','../expansion.css']
})
export class GDComponent {
  dates = ['Aug 11', 'Aug 12', 'Aug 13', 'Aug 14', 'Aug 15', 'Aug 16'];

  dialogService!: DialogOpenService;
  slotDataService = inject(SlotDataSevice);
  constructor(@Inject(DialogOpenService)dialogService:DialogOpenService){
    this.dialogService = dialogService;
  }

  eventType = 'GroupDiscussoin';
  timingsData = this.slotDataService.timingsGroup[this.eventType];

  expansion(opened:string,event:boolean) {
    const exp = document.getElementById(opened);
    event === true ? exp?.classList.add('highlight-venue'):exp?.classList.remove('highlight-venue');
    console.log(exp?.classList);    
  }
}
