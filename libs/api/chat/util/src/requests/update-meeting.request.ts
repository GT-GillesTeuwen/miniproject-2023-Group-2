import { IMeetingDetails, IMessage } from "../interfaces";

export interface IUpdateMeetingRequest {
  conversation: string
  meeting: IMeetingDetails;
}
