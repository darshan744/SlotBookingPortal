import { MatTableDataSource } from '@angular/material/table';
import { Slot } from '../../Models/Slots.model';
import { signal } from '@angular/core';
export interface IComponent {
  // Properties
  startDate: string;
  endDate: string;
  slots: Slot["slots"];
  selectedVenue: string;
  displayedColumns: string[];
  dataSource: MatTableDataSource<any>;
  slotTimings: Slot['slots'][0]['slots'];
  display: boolean;
  dates: string[];
  
  // Methods
  ngOnInit(): void;
  ngAfterViewChecked(): void;
  getSlots(): void;
  getDatesBetween(startDate: string, endDate: string): string[];
}
