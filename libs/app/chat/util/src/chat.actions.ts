import { IConversation, IMeetingDetails, IMessage } from '@mp/api/chat/util';


export class SubscribeToConversation {
  static readonly type = '[Chat] SubscribeToConversation';
  
  constructor(public readonly pairID: string) {}
}

export class SetConversation {
  static readonly type = '[Chat] SetConversation';
  constructor(public readonly conversation: IConversation | null) {}
}

export class CreateConversation{
  static readonly type = '[Chat] CreateConversation';
  constructor(
    public readonly conversation: IConversation,
  ) {}
}

export class SendMessage{
  static readonly type = '[Chat] SendMessage';
  constructor(
    public readonly conversationID: string,
    public readonly message: IMessage,
  ) {}
}

export class UpdateMeetingDetails{
  static readonly type = '[Chat] UpdateMeeingDetails';
  constructor(
    public readonly conversationID: string,
    public readonly meeting: IMeetingDetails,
  ) {}
}



