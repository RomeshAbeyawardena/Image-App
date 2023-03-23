export interface IToastNotification {
    heading:string;
    body?:string;
    visible:boolean;
}

export class ToastNotification implements IToastNotification {
    static create(heading:string, body:string|undefined, visible:boolean|null): IToastNotification
    {
        const notification = new ToastNotification();
        notification.body = body;
        notification.visible = visible ?? false;

        return notification;
    }

    heading:string = "";
    body?:string = "";
    visible:boolean = false;
}