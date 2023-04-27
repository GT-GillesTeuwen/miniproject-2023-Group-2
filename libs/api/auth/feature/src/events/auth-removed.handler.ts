import { AuthRepository } from '@mp/api/auth/data-access';
import { AuthRemovedEvent, AuthUpdatedEvent } from '@mp/api/auth/util';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(AuthRemovedEvent)
export class AuthRemovedhandler implements IEventHandler<AuthRemovedEvent> {
  constructor(private readonly repository: AuthRepository) {}

  async handle(event: AuthRemovedEvent) {
    console.log(`${AuthRemovedhandler.name}`);
    await this.repository.removeUser(event.auth);
  }
}
