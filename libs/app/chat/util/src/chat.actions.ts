import { IConversation, IMessage } from '@mp/api/chat/util';


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
    public readonly conversationID: string,
    public readonly message: IMessage,
  ) {}
}



