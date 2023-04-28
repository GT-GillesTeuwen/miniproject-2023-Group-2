import { IMeetingDetails } from "./meeting-details.interface";
import { IMessage } from "./message-details.interface";


export interface IConversation {
  PairID?: string | null | undefined;
  User1ID?: string | null | undefined;
  User2ID?: string | null | undefined;
  Messages?: IMessage[]|null |undefined;
  MeetingDetails?: IMeetingDetails|null|undefined;

}
