import { AuthService } from '@mp/api/auth/feature';
import { NestFactory } from '@nestjs/core';
import { UserRecord } from 'firebase-admin/auth';
import * as functions from 'firebase-functions';
import { CoreModule } from '../core.module';
import {IUpdateProfileRequest,IUpdateProfileResponse} from '@mp/api/profiles/util'
import { IRemoveAuthRequest, IRemoveAuthResponse } from '@mp/api/auth/util';

export const onAuthCreate = functions.auth
  .user()
  .onCreate(async (user: UserRecord) => {
    const app = await NestFactory.createApplicationContext(CoreModule);
    const service = app.get(AuthService);
    await service.onAuthCreate(user);
  });

  export const updateProfile = functions.https.onCall(
    async (
      request: IUpdateProfileRequest
    ): Promise<IUpdateProfileResponse> => {
      const app = await NestFactory.createApplicationContext(CoreModule);
      const service = app.get(AuthService);      
      return service.updateProfile(request);
    }
  );

  export const removeAuth = functions.https.onCall(
    async (
      request: IRemoveAuthRequest
    ): Promise<IRemoveAuthResponse> => {
      const app = await NestFactory.createApplicationContext(CoreModule);
      const service = app.get(AuthService);      
      return service.removeAuth(request);
    }
  );

