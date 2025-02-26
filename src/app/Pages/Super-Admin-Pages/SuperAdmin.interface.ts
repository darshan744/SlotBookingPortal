export interface IBaseResponse {
  success: boolean;
  message: string;
}
export interface ISlot {
  startDate:string;
  endDate:string;
  limit:number;
  year:string;
  eventType:string;
  slots:{time:string,limit:number}[]
  venuesAndStaffs : Venues[]
}

export type TAcceptedStaff = {
  id: string;
  name: string;
  display: boolean;
  forYear : string
};
export interface IStaff {
  id : string;
  name: string;
}
export interface IStaffAndEvents extends IBaseResponse {
  staffs : IStaff[];
  events : string[];
}

export interface Venues {
  venue: string;
  staffs: string[];
}

export interface ITimeAndLimit {
  time :string;
  limit:number;
}

export interface IBreaks {
  configurationId : string,
  breaks : {
    morningBreak :string,
    eveningBreak :string,
    lunchStart :string,
    lunchEnd :string,
  }
}

export interface IDashboard {
  totalEvents:number;
  events : {[key:string]: ISlot};
  slots : {
    slotId: string,
    startDate: Date,
    endDate: Date,
    eventType: string,
  }[];
  groupedEvents : {
    event:string;
    numberOfEvents:number;
  }[];
  students : {
    id : string ,
    name : string ,
    department : string ,
    year : string,
    eventHistory : {key : string , avg : number }[]
  }[],
  listOfEvents: string[]
}
export interface IStudent {
  "Id" : string,
  "Name" :string,
  "Year":string,
  "department":string

}
export interface IQuery {
  queryId:string,
  raiserId: string;
  title: string;
  description: string;
  status: 'Pending' | 'Resolved' | 'Rejected';
  remarks: string;
}
interface IBookingStatus {
  studentId: string;
  isBooked: boolean;
  bookingDate: Date | null;
  bookingTime: string | null;
  slotFinished: boolean;
}
interface IVenues extends Document {
  venue: string;
  staffs: string[];
  slots: { time: string; limit: number }[];
}
interface TimeSlot {
  time: string;
  limit: number;
}
interface IVenues2 {
  venue: string;
  staffs: {
    id: string; //staff id
    slots: {
      date: Date;
      timings: TimeSlot[];
    }[];
    //accepted timings alone will be kept here
  }[];
}
export type TSlot = {
  slotId: string;
  startDate: Date;
  endDate: Date;
  eventType: string;
  year: string;
  slots: IVenues2[];
  bookers: IBookingStatus[];
};
