import {
    CreateProfileCommand,
    IProfile,
    ProfileStatus
} from '@mp/api/profiles/util';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Timestamp } from 'firebase-admin/firestore';
import { Conversation } from '../models';
import { CreateConversationCommand, IConversation } from '@mp/api/chat/util';

@CommandHandler(CreateConversationCommand)
export class CreateConversationHandler
  implements ICommandHandler<CreateConversationCommand>
{
  constructor(private publisher: EventPublisher) {}

  async execute(command: CreateConversationCommand) {
    console.log(`${CreateConversationHandler.name}`);
    const request = command.request;
    const pairID = request.conversation.PairID;
    const user1ID = request.conversation.User1ID;
    const user2ID = request.conversation.User2ID;
    const messages = request.conversation.Messages;
    const meetingDetails=request.conversation.MeetingDetails;

    const data: IConversation = {
      PairID:pairID,
      User1ID : user1ID,
      User2ID: user2ID,
      Messages : messages,
      MeetingDetails:meetingDetails,
    };
    const conversation = this.publisher.mergeObjectContext(Conversation.fromData(data));
    console.log("here2");
    conversation.create();
    conversation.commit();
  }
}
