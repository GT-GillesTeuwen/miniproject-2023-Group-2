import { CreateAuthCommand, ICreateAuthRequest } from '@mp/api/auth/util';
// import { IUpdateProfileRequest, IUpdateProfileResponse } from '@mp/api/profiles/util';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { UserRecord } from 'firebase-admin/auth';
import {IUpdateProfileRequest,IUpdateProfileResponse,UpdateDetailsCommand} from '@mp/api/profiles/util'


@Injectable()
export class AuthService {
  constructor(private commandBus: CommandBus) {}

  onAuthCreate(user: UserRecord) {
    const request: ICreateAuthRequest = { userRecord: user };
    return this.commandBus.execute(new CreateAuthCommand(request));
  }

  async updateProfile(
    request: IUpdateProfileRequest
  ): Promise<IUpdateProfileResponse> {
    console.log("At service");
    console.log(request.profile.Settings?.AgeRange);
    return await this.commandBus.execute<
      UpdateDetailsCommand,
      IUpdateProfileResponse
    >(new UpdateDetailsCommand(request));
  }
}
