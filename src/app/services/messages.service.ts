import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";

export enum Severity {
    INFO,
    SUCCESS,
    WARNING,
    ERROR
}

export class Message {

    public severityName: string;

    constructor(public severity: Severity, public title: string, public content: string) {
        this.severityName = Severity[this.severity].toLowerCase();
    }

    toString(): string {
        return "[" + Severity[this.severity] + "] " + this.title + (this.content ? " - " + this.content : "");
    }
}

export class MessageServiceEvent {
    constructor(public message?: Message) {
    }
}

@Injectable()
export class MessagesService {

    private messages: Message[] = [];

    private eventSource: Subject<MessageServiceEvent> = new Subject<MessageServiceEvent>();
    public events: Observable<MessageServiceEvent> = this.eventSource.asObservable();

    constructor() {

    }

    public publish(message: Message): void {
        this.messages.push(message);
        this.emitEvent(new MessageServiceEvent(message));
    }

    public remove(message: Message): void {
        var index = this.messages.indexOf(message);
        if (index >= 0) {
            this.messages.splice(index, 1);
            this.emitEvent(new MessageServiceEvent());
        }
    }

    public clear(): void {
        this.messages = new Message[0];
        this.emitEvent(new MessageServiceEvent());
    }

    public getMessages(): Message[] {
        return this.messages;
    }

    private emitEvent(event: MessageServiceEvent) {
        if (this.eventSource && event) {
            this.eventSource.next(event);
        }
    }
}
