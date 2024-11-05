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
    success : boolean,
    data : {_id:string ,staffId : string, name : string}[]
}
export interface event{
    date : string,
    time : string , isAvailable : string
}
export interface eventResponseServer {
    slots : event[],
    message : string
}
