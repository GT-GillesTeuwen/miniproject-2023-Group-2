import {
    CreateProfileCommand,
    IProfile,
    ProfileStatus
} from '@mp/api/profiles/util';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Timestamp } from 'firebase-admin/firestore';
import { Message } from '../models';
import { CreateConversationCommand, IConversation,IMeetingDetails,IMessage,MessageSendCommand, UpdateMeetingCommand } from '@mp/api/chat/util';
import { from } from 'rxjs';
import { time } from 'console';
import { MeetingDetails } from '../models/meeting.model';

@CommandHandler(UpdateMeetingCommand)
export class UpdateMeetinHandler
  implements ICommandHandler<UpdateMeetingCommand>
{
  constructor(private publisher: EventPublisher) {}

  async execute(command: UpdateMeetingCommand) {
    console.log("Ahhhh in send handler");
    console.log(`${UpdateMeetinHandler.name}`);
    const request = command.request;
    const conversationID = request.conversation;
    const date=request.meeting.Date;
    const time=request.meeting.Time;
    const location=request.meeting.Location;
    const foodPreference=request.meeting.FoodPreference;
    const dressCode=request.meeting.DressCode;

    const data: IMeetingDetails = {
      Date:date,
      Time : time,
      Location: location,
      FoodPreference : foodPreference,
      DressCode:dressCode
    };
    const message = this.publisher.mergeObjectContext(MeetingDetails.fromData(data));
    message.updateMeeting(conversationID);
    message.commit();
  }
}
