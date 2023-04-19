import { IMessage } from '../interfaces';

export class MessageSentEvent {
  constructor(
    public readonly conversationID:string,
    public readonly message: IMessage) {console.log("made message sent event")}
}
