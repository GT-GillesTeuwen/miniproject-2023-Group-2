import { IMessageSendRequest } from "../requests";

export class MessageSendCommand {
  constructor(public readonly request: IMessageSendRequest) {}
}