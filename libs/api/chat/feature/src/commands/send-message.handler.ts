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
    console.log(`${SendMessageHandler.name}`);
    const request = command.request;
    const pairID = request.pairID;
    const toUser=request.message.ToUserID;
    const fromUser=request.message.FromUserID;
    const timestamp=Timestamp.fromDate(new Date());
    const content=request.message.Content;

    const data: IMessage = {
      ToUserID:toUser,
      FromUserID : fromUser,
      DateSent: timestamp,
      Content : content,
    };
    const message = this.publisher.mergeObjectContext(Message.fromData(data));
    message.send1(pairID);
    message.commit();
  }
}
