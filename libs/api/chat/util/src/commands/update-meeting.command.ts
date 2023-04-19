
import { IUpdateMeetingRequest } from "../requests/update-meeting.request";

export class UpdateMeetingCommand {
  constructor(
    public readonly request: IUpdateMeetingRequest) {}
}