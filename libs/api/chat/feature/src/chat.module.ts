import { ChatModule as ChatDataAccessModule } from '@mp/api/chat/data-access';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import {
    CreateConversationHandler,
} from './commands';
import {
    ConversationCreatedHandler
} from './events';
import { ChatSagas } from './chat.sagas';
import { ChatService } from './chat.service';
export const CommandHandlers = [
  CreateConversationHandler,
];
export const EventHandlers = [
  ConversationCreatedHandler,
];

@Module({
  imports: [CqrsModule, ChatDataAccessModule],
  providers: [
    ChatService,
    ...CommandHandlers,
    ...EventHandlers,
    ChatSagas,
  ],
  exports: [ChatService],
})
export class ChatModule {}
