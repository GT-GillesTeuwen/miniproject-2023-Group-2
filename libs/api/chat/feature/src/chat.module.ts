import { ChatModule as ChatDataAccessModule } from '@mp/api/chat/data-access';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import {
    CreateConversationHandler,
} from './commands';
import {
    ConversationCreatedHandler, MessageSentHandler
} from './events';
import { ChatSagas } from './chat.sagas';
import { ChatService } from './chat.service';
import { SendMessageHandler } from './commands/send-message.handler';

export const CommandHandlers = [
  CreateConversationHandler,
  SendMessageHandler,
];
export const EventHandlers = [
  ConversationCreatedHandler,
  MessageSentHandler
];

@Module({
  imports: [CqrsModule, ChatDataAccessModule],
  providers: [ChatService, ...CommandHandlers, ...EventHandlers, ChatSagas],
  exports: [ChatService],
})
export class ChatModule {}
