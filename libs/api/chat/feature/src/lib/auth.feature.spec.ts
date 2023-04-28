import { CreateConversationCommand, IConversation, ICreateConversationRequest } from '@mp/api/chat/util';
import { CreateConversationHandler } from '../commands/create-conversation.handler';
import { MessageSendCommand } from '@mp/api/chat/util';
import { SendMessageHandler } from '../commands/send-message.handler';
import { UpdateMeetingCommand } from '@mp/api/chat/util';
import { UpdateMeetinHandler } from '../commands/update-meeting.handler';
import { Timestamp } from 'firebase/firestore';

describe('AuthFeature', () => {
  let createConversationCommand: CreateConversationCommand;
  let createConversationHandler: CreateConversationHandler;
  let messageSendCommand: MessageSendCommand;
  let sendMessageHandler: SendMessageHandler;
  let udpateMeetingCommand: UpdateMeetingCommand;
  let updateMeetingsHandler: UpdateMeetinHandler;

  describe('AuthFeature', () => {

    const request: IConversation = {
      PairID: '1',
      User1ID: '1',
      User2ID: '2',
      Messages: [{
        ToUserID: '1',
        FromUserID: '2',
        DateSent: Timestamp.now(),
        Content:'Hello'
      }],
      MeetingDetails: {
        Date: '2022',
        Time: '21:00:00',
        Location:'France',
        FoodPreference: 'sushi',
        DressCode: 'Formal',
        TimeInvested: 12
      }
    }

    //createConversationCommand = new CreateConversationHandler(createConverstationRequest);
    //it('should work', async () => {
    //  expect(await createConversationCommand.execute(createConversationCommand)).toEqual(NotImplementedException);
    //});
  });
});
  

