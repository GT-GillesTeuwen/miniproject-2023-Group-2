import { Timestamp } from "firebase-admin/firestore";

export interface IMessage {
  ToUserID?: string | null | undefined;
  FromUserID?: string | null | undefined;
  DateSent?: Timestamp |null|undefined;
  Content?: string | null |undefined;
}
