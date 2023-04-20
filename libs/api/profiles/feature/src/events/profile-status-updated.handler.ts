import { ProfilesRepository } from '@mp/api/profiles/data-access';
import { ProfileDetailsUpdatedEvent } from '@mp/api/profiles/util';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(ProfileDetailsUpdatedEvent)
export class ProfileDetailsUpdatedHandler
  implements IEventHandler<ProfileDetailsUpdatedEvent>
{
  constructor(private readonly repository: ProfilesRepository) {}

  async handle(event: ProfileDetailsUpdatedEvent) {
    console.log(`${ProfileDetailsUpdatedHandler.name}`);
    console.log(event.profile.Settings?.AgeRange);
    await this.repository.updateProfile(event.profile);
  }
}
