import { ChatRepository } from '@mp/api/chat/data-access';
import { MessageSentEvent } from '@mp/api/chat/util';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(MessageSentEvent)
export class MessageSentHandler
  implements IEventHandler<MessageSentEvent>
{
  constructor(private readonly repository: ChatRepository) {}

  async handle(event: MessageSentEvent) {
    console.log("AHHHH in handler");
    console.log(`${MessageSentHandler.name}`);
    await this.repository.sendMessage(event.message,event.conversationID);
  }
}
