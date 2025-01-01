

export interface SlotBreaks {
    morningBreak : string,
    eveningBreak : string,
    lunchStart : string,
    lunchEnd : string,
    range : number
}
export type data = {
    id: string,
    phoneNumber: string,
    name: string,
    email: string,
    unmodifiedCount: number
    forYear : string,
    eventType : string,
}

export type staffs = {
    success : boolean,
    data : {id : string, name : string}[]
}
export interface event{
    date : string,
    time : string , isAvailable : string
}
export interface eventResponseServer {
    slots : event[],
    message : string,
    responseDeadline : Date,
}
