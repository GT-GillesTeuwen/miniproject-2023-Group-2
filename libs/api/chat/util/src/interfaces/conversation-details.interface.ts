import { IMessage } from "./message-details.interface";


export interface IConversation {
  ConversationID?: string | null | undefined;
  User1ID?: string | null | undefined;
  User2ID?: string | null | undefined;
  Messages?: IMessage[]|null |undefined;

}
