import { IMeetingDetails, IMessage } from "../interfaces";

export interface IUpdateMeetingRequest {
  pairID: string
  meeting: IMeetingDetails;
}
