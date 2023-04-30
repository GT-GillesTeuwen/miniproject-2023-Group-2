import { ProfilesRepository } from '@mp/api/profiles/data-access';
import { RemoveProfileUpdatedEvent } from '@mp/api/profiles/util';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(RemoveProfileUpdatedEvent)
export class RemoveProfileUpdatedHandler
  implements IEventHandler<RemoveProfileUpdatedEvent>
{
  constructor(private readonly repository: ProfilesRepository) {}

  async handle(event: RemoveProfileUpdatedEvent) {
    console.log(`${RemoveProfileUpdatedEvent.name}`);
    await this.repository.removeProfile(event.profile);
  }
}
