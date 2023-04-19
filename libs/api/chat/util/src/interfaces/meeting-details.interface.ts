import { IMessage } from "./message-details.interface";


export interface IMeetingDetails {
  Date?: string | null | undefined;
  Time?: string | null | undefined;
  Location?: string | null | undefined;
  FoodPreference?: string|null |undefined;
  DressCode?: string |null | undefined;
}
