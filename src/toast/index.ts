export interface IToast {
    heading:string;
    body?:string;
    visible:boolean;
}

export class Toast implements IToast {
    heading:string = "";
    body?:string = "";
    visible:boolean = false;
}