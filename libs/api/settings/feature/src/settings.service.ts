import {
    IUpdatePrivacyDetailsRequest,
    IUpdatePrivacyDetailsResponse,
    UpdatePrivacyDetailsCommand,
} from '@mp/api/settings/util';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { NotImplementedException } from '@nestjs/common';

@Injectable()
export class SettingsService {
  //constructor(private readonly commandBus: CommandBus) {}     **correct line
  constructor() {} 

  async updatePrivacyDetails(
    request: IUpdatePrivacyDetailsRequest
  ): Promise<IUpdatePrivacyDetailsResponse> {
    //CORRECT STUFF:
    // return await this.commandBus.execute<
    //   UpdatePrivacyDetailsCommand,
    //   IUpdatePrivacyDetailsResponse
    // >(new UpdatePrivacyDetailsCommand(request));
    //
    throw new NotImplementedException;
  }
}
