import { SettingsRepository } from '@mp/api/settings/data-access';
import { PrivacyDetailsUpdatedEvent } from '@mp/api/settings/util';
import { NotImplementedException } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(PrivacyDetailsUpdatedEvent)
export class PrivacyDetailsUpdatedHandler
  implements IEventHandler<PrivacyDetailsUpdatedEvent>
{
  constructor(private readonly repository: SettingsRepository) {}

  async handle(event: PrivacyDetailsUpdatedEvent) {
    return NotImplementedException;
  }
}
