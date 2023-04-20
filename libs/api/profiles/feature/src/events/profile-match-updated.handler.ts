import { ProfilesRepository } from '@mp/api/profiles/data-access';
import { ProfileDetailsUpdatedEvent, ProfileMatchesUpdatedEvent } from '@mp/api/profiles/util';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(ProfileMatchesUpdatedEvent)
export class ProfileMatchesUpdatedEventhandler
  implements IEventHandler<ProfileMatchesUpdatedEvent>
{
  constructor(private readonly repository: ProfilesRepository) {}

  async handle(event: ProfileDetailsUpdatedEvent) {
    console.log(`${ProfileMatchesUpdatedEventhandler.name}`);
    await this.repository.updateMatches(event.profile);
  }
}