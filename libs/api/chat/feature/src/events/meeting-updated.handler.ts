import { ChatRepository } from '@mp/api/chat/data-access';
import { MeetingUpdatedEvent, MessageSentEvent } from '@mp/api/chat/util';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(MeetingUpdatedEvent)
export class MeetingUpdatedHandler
  implements IEventHandler<MeetingUpdatedEvent>
{
  constructor(private readonly repository: ChatRepository) {}

  async handle(event: MeetingUpdatedEvent) {
    console.log(`${MeetingUpdatedHandler.name}`);
    await this.repository.updateMeeting(event.meeting,event.conversationID);
  }
}
