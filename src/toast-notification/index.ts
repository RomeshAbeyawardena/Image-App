export interface IToastNotification {
    heading:string;
    body?:string;
    visible:boolean;
}

export class ToastNotification implements IToastNotification {
    heading:string = "";
    body?:string = "";
    visible:boolean = false;
}