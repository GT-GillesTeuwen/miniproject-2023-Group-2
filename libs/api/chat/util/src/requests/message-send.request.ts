import { IMessage } from "../interfaces";

export interface IMessageSendRequest {
  pairID: string
  message: IMessage;
}
