export interface IBookingStatus {
  studentId: string,
  isBooked: boolean,
  bookingDate: Date | null,
  bookingTime: string | null
}

export interface TimeSlot {
  time : string,
  limit : number,
}
export interface IVenues2  {
  venue: string,
  staffs : {
    id:string, //staff id
    slots:{
      date : Date,
      timings : TimeSlot[] //accepted timings alone will be kept here
    }[]
  }[]
}
export interface ISlot  {
  slotId: string,
  startDate: Date,
  endDate: Date,
  eventType: string,
  year: string,
  slots: IVenues2[],
  bookers: IBookingStatus[]
}
