import { IAgeRange } from "./age-range.interface";

export interface ISettings {
  Privacy?: string | null | undefined;
  AgeRange?: IAgeRange | null| undefined;
  BlockedList?: string[] | null| undefined;
}