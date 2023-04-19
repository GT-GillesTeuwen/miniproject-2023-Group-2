import { IMessage } from "../interfaces";

export interface IMessageSendRequest {
  conversation: string
  message: IMessage;
}
