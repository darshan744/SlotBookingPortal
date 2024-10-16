import { Signal } from "@angular/core"

export interface SlotBreaks {
    morningBreak : string,
    eveningBreak : string,
    lunchStart : string,
    lunchEnd : string,
    range : number
}
export type data = {
    staff_id : string,
    name : string,
    status : string,
    phone_number : string,
    email : string,
    slots : Signal<string[]>
}

export type staffs = {
    status : boolean,
    staffs : {_id:string , name : string}[]
}
export interface event{
    date : string,
    time : string , isAvailable : string
}
export interface eventResponseServer {
    slots : event[],
    message : string
}
