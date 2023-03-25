export enum EventSource {
    "menu",
    "swipe"
}

export interface IEventData {
    source: EventSource;
    value: any;
}