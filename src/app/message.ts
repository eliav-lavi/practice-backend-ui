import { Moment } from 'moment';
import * as moment from 'moment-timezone';

export enum MessageType {
    Info = 'info',
    Success = 'success',
    Error = 'error'
}

export class Message {
    content: string;
    timestamp: Moment;
    type: MessageType;

    constructor(content: string, type: MessageType = MessageType.Info, timestamp: Moment = moment()) {
        this.content = content;
        this.type = type;
        this.timestamp = timestamp;
    }
}