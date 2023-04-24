import { IMeetingDetails } from '../interfaces';

export class MeetingUpdatedEvent {
  constructor(
    public readonly pairID:string,
    public readonly meeting: IMeetingDetails) {}
}
