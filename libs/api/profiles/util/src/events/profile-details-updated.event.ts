import { IProfile } from '../interfaces';

export class ProfileDetailsUpdatedEvent { // refer to api/feature/src/events/handler
  constructor(public readonly profile: IProfile) {}
}
