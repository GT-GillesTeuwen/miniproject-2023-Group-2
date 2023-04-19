
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ICreateConversationRequest,ICreateConversationResponse,CreateConversationCommand, IMessageSendRequest,IMessageSendResponse, MessageSendCommand } from '@mp/api/chat/util';

@Injectable()
export class ChatService {
  constructor(private readonly commandBus: CommandBus) {}


  async createConversation2(
    request: ICreateConversationRequest
  ): Promise<ICreateConversationResponse> {
    return await this.commandBus.execute<
      CreateConversationCommand,
      ICreateConversationResponse
    >(new CreateConversationCommand(request));
  }

  async sendMessage(
    request: IMessageSendRequest
  ): Promise<IMessageSendResponse> {
    console.log("AHHHH in service");
    return await this.commandBus.execute<
      MessageSendCommand,
      IMessageSendResponse
    >(new MessageSendCommand(request));
  }

 
}
