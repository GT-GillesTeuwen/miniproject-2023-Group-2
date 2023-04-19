import { IMeetingDetails } from '../interfaces';

export class MeetingUpdatedEvent {
  constructor(
    public readonly conversationID:string,
    public readonly meeting: IMeetingDetails) {}
}
