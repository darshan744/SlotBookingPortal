import { Component } from '@angular/core';
import {TSlot} from '../SuperAdmin.interface'
import { SuperAdminService } from '../../../Services/SuperAdminServices/SlotGenerate/super-admin.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-manage-slots',
  imports: [CommonModule],
  templateUrl: './manage-slots.component.html',
  styleUrl: './manage-slots.component.css',
})
export class ManageSlotsComponent {
  slots: TSlot[] = [];
  constructor(private serivce : SuperAdminService) { }
  ngOnInit() {
    this.serivce.getSlots().subscribe(slot => this.slots = slot.data)
  }
}

