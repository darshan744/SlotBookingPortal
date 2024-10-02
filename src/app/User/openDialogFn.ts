import { DialogComponent } from "./dialog/dialog.component";

export function openPopOver(this: any, time:string):void{
    this.popOver.open(DialogComponent,{
        width:'300px',height:'250px',
        data:{timing:time}
    })
}