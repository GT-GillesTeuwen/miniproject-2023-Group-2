
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
    console.log("I am in service");
    return await this.commandBus.execute<
      updateMatchCommand,
      IUpdateMatchResponse
    >(new updateMatchCommand(request));
  }

}
