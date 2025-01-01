
/** New Interface for slots with modification  */
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

/** Old Interface of the slots */

