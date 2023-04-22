import { IConversation, IMeetingDetails, IMessage } from '@mp/api/chat/util';


export class SubscribeToConversation {
  static readonly type = '[Chat] SubscribeToConversation';
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
    public readonly pairID: string,
    public readonly message: IMessage,
    public readonly newMeetingTime:number,
  ) {}
}

export class UpdateMeetingDetails{
  static readonly type = '[Chat] UpdateMeeingDetails';
  constructor(
    public readonly pairID: string,
    public readonly meeting: IMeetingDetails,
  ) {}
}



