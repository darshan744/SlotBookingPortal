import { Component,inject } from '@angular/core';
import {CommonModule} from '@angular/common'
import { MatDialogModule ,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import {data} from '../../Models/slot-breaks'
import { MatDivider } from '@angular/material/divider';
import { MatList, MatListItem } from '@angular/material/list';
import { MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { MatAccordion, MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle } from '@angular/material/expansion';
import { MatChip, MatChipGrid, MatChipListbox, MatChipsModule } from '@angular/material/chips';

interface Slot {
  time: string;
  isAvailable: string; // "Accepted" or "Declined"
}

interface AvailableSlot {
  date: string; // Or Date if you prefer
  slots: Slot[];
}

interface Staff {
  staffId: string;
  name: string;
  availableSlots: AvailableSlot[];
}

@Component({
  selector: 'app-status-dialog',
  standalone: true,
  imports: [CommonModule,MatButton,MatDialogModule
    ,MatCardContent,MatCardHeader,MatCardTitle,MatCard,MatCardSubtitle,MatChipsModule,
    MatAccordion,MatExpansionPanel,MatExpansionPanelHeader,MatExpansionPanelTitle,MatButton,MatDialogModule
  ],
  templateUrl: './status-dialog.component.html',
  styleUrl: './status-dialog.component.css'
})
export class StatusDialogComponent {

  data:Staff = inject(MAT_DIALOG_DATA);
}
