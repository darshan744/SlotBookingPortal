import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SlotGenerateService {

  constructor() { }
  private timeToMinutes(time : string):number {
    const [hours , minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }
  
  private minutesToTime ( minutes : number) : string {
    const hours = Math.floor(minutes / 60);
    const min = Math.floor(minutes % 60);
    return `${hours.toString().padStart(2,'0')} : ${min.toString().padStart(2,'0')}`
  } 
  generate(morningBreak : string , eveningBreak : string ,
     lunchStart : string , lunchEnd : string , range : number) {
      let startTime = '9:00' ;
      const  endTime = '16:30';
      const slots:string[] = [];
      const breakRange:number = 15;
      let startMinutes = this.timeToMinutes(startTime);
      let endMinutes = this.timeToMinutes(endTime);
      let morningBreakMinutes = this.timeToMinutes(morningBreak);
      let eveningBreakMinutes = this.timeToMinutes(eveningBreak);
      let lunchStartMinutes = this.timeToMinutes(lunchStart);
      let lunchEndMinutes = this.timeToMinutes(lunchEnd);

      while(startMinutes <= endMinutes ) {
        let newTime = this.minutesToTime(startMinutes);
        if( (startMinutes >= morningBreakMinutes && startMinutes < morningBreakMinutes + breakRange) ||
            (startMinutes >= eveningBreakMinutes && startMinutes < eveningBreakMinutes + breakRange) ||
            startMinutes >= lunchStartMinutes && startMinutes < lunchEndMinutes)
         {
          startMinutes += range;
          continue;
        }
        slots.push(newTime);
        startMinutes = startMinutes + range;
      }
      return slots;
  }
}
