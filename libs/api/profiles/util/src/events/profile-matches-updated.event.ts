import { IProfile } from '../interfaces';

export class ProfileMatchesUpdatedEvent { // refer to api/feature/src/events/handler
  constructor(public readonly profile: IProfile) {}
}
