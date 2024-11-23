import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-event-booking',
  standalone: true,
  imports: [],
  templateUrl: './event-booking.component.html',
  styleUrl: './event-booking.component.css'
})
export class EventBookingComponent {
  @Input() eventType : string = '';
  @Input() eventData : any[] = [];

  
}
