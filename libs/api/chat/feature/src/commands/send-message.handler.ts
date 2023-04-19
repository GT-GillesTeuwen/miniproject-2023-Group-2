import {
    CreateProfileCommand,
    IProfile,
    ProfileStatus
} from '@mp/api/profiles/util';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Timestamp } from 'firebase-admin/firestore';
import { Message } from '../models';
import { CreateConversationCommand, IConversation,IMessage,MessageSendCommand } from '@mp/api/chat/util';
import { from } from 'rxjs';
import { time } from 'console';

@CommandHandler(MessageSendCommand)
export class SendMessageHandler
  implements ICommandHandler<MessageSendCommand>
{
  constructor(private publisher: EventPublisher) {}

  async execute(command: MessageSendCommand) {
    console.log("Ahhhh in send handler");
    console.log(`${SendMessageHandler.name}`);
    const request = command.request;
    const conversationID = request.conversation;
    const toUser=request.message.ToUserID;
    const fromUser=request.message.FromUserID;
    const timestamp=request.message.DateSent;
    const content=request.message.Content;

    const data: IMessage = {
      ToUserID:toUser,
      FromUserID : fromUser,
      DateSent: timestamp,
      Content : content,
    };
    const message = this.publisher.mergeObjectContext(Message.fromData(data));
    message.send1(conversationID);
    message.commit();
  }
}
