import { ConversationCreatedEvent } from '@mp/api/chat/util';
import { ChatRepository } from '@mp/api/chat/data-access';
import { AccountDetailsUpdatedEvent } from '@mp/api/profiles/util';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(ConversationCreatedEvent)
export class ConversationCreatedHandler
  implements IEventHandler<ConversationCreatedEvent>
{
  constructor(private readonly repository: ChatRepository) {}

  async handle(event: ConversationCreatedEvent) {
    console.log(`${ConversationCreatedEvent.name}`);
    await this.repository.createConversation(event.conversation);
  }
}
