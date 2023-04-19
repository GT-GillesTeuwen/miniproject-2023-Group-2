import { Timestamp } from "firebase-admin/firestore";

export interface IMessage {
  fromUserID?: string | null | undefined;
  toUserID?: string | null | undefined;
  dateSent?: Timestamp |null|undefined;
  content?: string | null |undefined;
}
