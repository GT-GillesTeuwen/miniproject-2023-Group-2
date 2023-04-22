import { IMessage } from '../interfaces';

export class MessageSentEvent {
  constructor(
    public readonly pairID:string,
    public readonly message: IMessage) {console.log("made message sent event")}
}
