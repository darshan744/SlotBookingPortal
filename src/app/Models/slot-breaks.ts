import { Signal } from "@angular/core"

export interface SlotBreaks {
    morningBreak : string,
    eveningBreak : string,
    lunchStart : string,
    lunchEnd : string,
    range : number
}
export type data = {
    staffId: string,
    phoneNumber: string,
    name: string,
    email: string,
    unmodifiedCount: number
}

export type staffs = {
    status : boolean,
    staffs : {_id:string ,staffId : string, name : string}[]
}
export interface event{
    date : string,
    time : string , isAvailable : string
}
export interface eventResponseServer {
    slots : event[],
    message : string
}
