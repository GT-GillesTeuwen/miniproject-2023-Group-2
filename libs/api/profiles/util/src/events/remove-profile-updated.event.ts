import { IProfile } from '../interfaces';

export class RemoveProfileUpdatedEvent { // refer to api/feature/src/events/handler
  constructor(public readonly profile: IProfile) {}
}
