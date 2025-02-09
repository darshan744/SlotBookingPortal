interface IBookingStatus {
  studentId: string,
  isBooked: boolean,
  bookingDate: Date | null,
  bookingTime: string | null
}

interface TimeSlot {
  time : string,
  limit : number,
}
interface IVenues2  {
  venue: string,
  staffs : {
    id:string, //staff id
    slots:{
      date : Date,
      timings : TimeSlot[] //accepted timings alone will be kept here
    }[]
  }[]
}
interface ISlot  {
  slotId: string,
  startDate: Date,
  endDate: Date,
  eventType: string,
  year: string,
  slots: IVenues2[],
  bookers: IBookingStatus[]
}

export {ISlot , TimeSlot , IBookingStatus}
