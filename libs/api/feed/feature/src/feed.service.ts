
import {
    IUpdateMatchRequest,
    IUpdateMatchResponse,
    updateMatchCommand
} from '@mp/api/feed/util';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

@Injectable()
export class FeedService {
  constructor(private readonly commandBus: CommandBus) {}   


  async updateMatch(
    request: IUpdateMatchRequest
  ): Promise<IUpdateMatchResponse> {
    return await this.commandBus.execute<
      updateMatchCommand,
      IUpdateMatchResponse
    >(new updateMatchCommand(request));
  }

}
