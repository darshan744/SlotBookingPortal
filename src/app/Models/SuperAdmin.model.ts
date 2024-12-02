import { staffs } from "./slot-breaks";

export type slotData = {
  staffs: staffs["data"],
  startDate: string, endDate: string ,
  responseDeadline : Date,
}
export interface Slot {
  time: string;
  isAvailable: string; // "Accepted" or "Declined"
}

export type AcceptedResponse = {
  success: boolean,
  data: [{
    instructorId: {
      staffId: string,
      name: string,
    },
    unmodifiedCount: number ,
  }]
}

export interface AvailableSlot {
  date: string; // Or Date if you prefer
  slots: Slot[];
}

export interface Staff {
  availableSlots: AvailableSlot[];
  staffId: string;
  name: string;
}

export type AllResponse = {
  staffId: string,
  phoneNumber: string,
  name: string,
  email: string,
  unmodifiedCount: number
}
export interface IEventInfo {
  Name : string ,
  Description : string ,
  MaximumParticipant:number
}
