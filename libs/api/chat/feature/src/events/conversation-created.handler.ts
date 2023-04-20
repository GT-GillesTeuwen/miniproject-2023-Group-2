import { ConversationCreatedEvent } from '@mp/api/chat/util';
import { ChatRepository } from '@mp/api/chat/data-access';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(ConversationCreatedEvent)
export class ConversationCreatedHandler
  implements IEventHandler<ConversationCreatedEvent>
{
  constructor(private readonly repository: ChatRepository) {}

  async handle(event: ConversationCreatedEvent) {
    console.log("here4");
    console.log(`${ConversationCreatedEvent.name}`);
    await this.repository.createConversation1(event.conversation);
    console.log("here6")
  }
}
